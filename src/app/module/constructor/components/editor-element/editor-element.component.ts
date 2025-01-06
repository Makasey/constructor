import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostBinding,
    Injector,
    OnInit,
    Signal,
    ViewEncapsulation,
    computed,
    inject,
    input,
} from "@angular/core";

import {
    EDITOR_SELECTED_ELEMENT,
    SitePageElementSettingsUnion,
    SitePageElementSizeSettings,
    processSettingValueWithUnit,
} from "@modules/constructor";
import { LZElementActionsComponent } from "../element-actions";
import { TabSelectionDirective, ToggleSelectionDirective } from "@shared-directives";
import { hostBinding } from "@modules/constructor/utils/host-binding";
import { provideElementSettings } from "@modules/constructor/utils/element.utils";

@Component({
    selector: "lz-editor-element",
    templateUrl: "./editor-element.component.html",
    styleUrl: "./editor-element.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [LZElementActionsComponent],
    hostDirectives: [TabSelectionDirective, ToggleSelectionDirective],
    standalone: true,
})
export class LZEditorElementComponent implements OnInit {
    @HostBinding("class.lz-editor-element")
    public readonly hostClass = true;

    public readonly elementId = input.required<string>();

    public readonly parentId = input.required<string>();

    public readonly element: ElementRef<HTMLElement> = inject(ElementRef<HTMLElement>);

    public readonly selectedElement = inject(EDITOR_SELECTED_ELEMENT);

    public readonly elementSettings = provideElementSettings(this.elementId);

    private readonly injector = inject(Injector);

    public ngOnInit(): void {
        hostBinding(this.selectSlice("height", processSettingValueWithUnit), "style.height", this.injector);

        hostBinding(this.selectSlice("width", processSettingValueWithUnit), "style.width", this.injector);
    }

    private selectSlice<T extends keyof SitePageElementSizeSettings, V = SitePageElementSettingsUnion[T]>(
        key: T,
        reducer: (item: SitePageElementSizeSettings[T]) => V = item => item as V,
    ): Signal<V> {
        return computed(() => {
            const setting = this.elementSettings()[key];

            return reducer(setting);
        });
    }
}
