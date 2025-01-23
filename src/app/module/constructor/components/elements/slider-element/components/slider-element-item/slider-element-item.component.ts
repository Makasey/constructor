import {
    AbstractEditorElementActionsService,
    AbstractEditorElementSettingsService,
    ELEMENT_ID,
    PARENT_ID,
    SliderItemPageElement,
    SliderPageElementItemSettings,
    processBackgroundValue,
} from "@modules/constructor";
import { ChangeDetectionStrategy, Component, HostBinding, HostListener, OnInit, Signal, ViewEncapsulation, inject } from "@angular/core";
import { LZEditorElementFlexComponent } from "@modules/constructor/components/editor-element/components/editor-element-flex/editor-element-flex.component";
import { Observable, map } from "rxjs";
import { TabSelectionDirective, ToggleSelectionDirective } from "@shared-directives";
import { toSignal } from "@angular/core/rxjs-interop";

@Component({
    selector: "lz-slider-element-item",
    templateUrl: "./slider-element-item.component.html",
    styleUrl: "./slider-element-item.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    hostDirectives: [TabSelectionDirective, ToggleSelectionDirective],
    standalone: true,
    host: {
        class: "lz-slider-element-item",
    },
    imports: [LZEditorElementFlexComponent],
})
export class SliderElementItemComponent implements OnInit {
    @HostBinding("$.style.background")
    @HostListener("$.style.background")
    public background$: Observable<string>;

    public readonly ELEMENT_ID = inject(ELEMENT_ID);

    protected readonly parentId = inject(PARENT_ID);
    private readonly editorElementActionsService = inject(AbstractEditorElementActionsService);
    public readonly element: Signal<SliderItemPageElement> = toSignal(this.editorElementActionsService.selectElement(this.ELEMENT_ID));
    private readonly elementSettingsService = inject(AbstractEditorElementSettingsService);

    private settings$: Observable<SliderPageElementItemSettings> = this.elementSettingsService.selectSettings(this.ELEMENT_ID);

    public ngOnInit(): void {
        this.background$ = this.settings$.pipe(map(settings => processBackgroundValue(settings.background)));
    }
}
