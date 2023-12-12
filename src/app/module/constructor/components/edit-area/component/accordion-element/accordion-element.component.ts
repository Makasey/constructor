import {
    AbstractEditorElementActionsService,
    AbstractEditorElementSettingsService,
    AbstractEditorSelectionService,
    AccordionPageElementSettings,
    ELEMENT_ID,
    processSettingValueWithUnit,
} from "@modules/constructor";
import { ChangeDetectionStrategy, Component, HostBinding, HostListener, OnInit, ViewEncapsulation, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Observable, map } from "rxjs";
import { TabSelectionDirective, ToggleSelectionDirective } from "@shared-directives";

@Component({
    selector: "lz-accordion-element",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./accordion-element.component.html",
    styleUrl: "./accordion-element.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    hostDirectives: [TabSelectionDirective, ToggleSelectionDirective],
})
export class AccordionElementComponent implements OnInit {
    @HostBinding("class.lz-accordion-element")
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

    private readonly elementSelectionService = inject(AbstractEditorSelectionService);

    private settings$: Observable<AccordionPageElementSettings> = this.elementSettingsService.selectSettings(this.ELEMENT_ID);
    public ngOnInit(): void {
        this.width$ = this.settings$.pipe(map(settings => processSettingValueWithUnit(settings.width)));

        this.height$ = this.settings$.pipe(map(settings => processSettingValueWithUnit(settings.height)));
    }
}
