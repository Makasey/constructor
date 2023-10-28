import { ChangeDetectionStrategy, Component, HostBinding, HostListener, OnInit, ViewEncapsulation, inject } from "@angular/core";
import { CommonModule } from "@angular/common";

import { Observable, map } from "rxjs";

import {
    AbstractEditorElementActionsService,
    AbstractEditorElementSettingsService,
    ELEMENT_ID,
    TabsItemPageElement,
    TabsItemPageElementSettings,
    processSettingValueWithUnit,
} from "@modules/constructor";
import { ElementResolverDirective, TabSelectionDirective, ToggleSelectionDirective } from "@shared-directives";

@Component({
    selector: "lz-tab-element-item",
    standalone: true,
    imports: [CommonModule, ElementResolverDirective],
    templateUrl: "./tab-element-item.component.html",
    styleUrls: ["./tab-element-item.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    hostDirectives: [TabSelectionDirective, ToggleSelectionDirective],
})
export class TabElementItemComponent implements OnInit {
    @HostBinding("class.lz-tab-element-item")
    public hostClass = true;

    @HostBinding("$.style.min-height")
    @HostListener("$.style.min-height")
    public height$: Observable<string>;

    @HostBinding("$.style.width")
    @HostListener("$.style.width")
    public width$: Observable<string>;

    public readonly ELEMENT_ID = inject(ELEMENT_ID);

    private readonly editorElementActionsService = inject(AbstractEditorElementActionsService);

    private readonly elementSettingsService = inject(AbstractEditorElementSettingsService);

    private settings$: Observable<TabsItemPageElementSettings> = this.elementSettingsService.selectSettings(this.ELEMENT_ID);

    public element$: Observable<TabsItemPageElement> = this.editorElementActionsService.selectElement(this.ELEMENT_ID);

    public ngOnInit(): void {
        this.width$ = this.settings$.pipe(map(settings => processSettingValueWithUnit(settings.width)));

        this.height$ = this.settings$.pipe(map(settings => processSettingValueWithUnit(settings.height)));
    }

    public _trackBy(_: number, item: string): string {
        return item;
    }
}
