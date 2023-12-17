import {
    AbstractEditorElementActionsService,
    AbstractEditorElementSettingsService,
    AccordionItemPageElement,
    AccordionItemPageElementSettings,
    ELEMENT_ID,
    processSettingValueWithUnit,
} from "@modules/constructor";
import { ChangeDetectionStrategy, Component, HostBinding, HostListener, OnInit, Signal, ViewEncapsulation, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ElementResolverDirective, TabSelectionDirective, ToggleSelectionDirective } from "@shared-directives";
import { Observable, map } from "rxjs";
import { toSignal } from "@angular/core/rxjs-interop";

@Component({
    selector: "lz-accordion-element-item",
    standalone: true,
    imports: [CommonModule, ElementResolverDirective],
    templateUrl: "./accordion-element-item.component.html",
    styleUrl: "./accordion-element-item.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    hostDirectives: [TabSelectionDirective, ToggleSelectionDirective],
})
export class AccordionElementItemComponent implements OnInit {
    @HostBinding("class.lz-accordion-element-item")
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

    private settings$: Observable<AccordionItemPageElementSettings> = this.elementSettingsService.selectSettings(this.ELEMENT_ID);

    public element: Signal<AccordionItemPageElement> = toSignal(this.editorElementActionsService.selectElement(this.ELEMENT_ID));

    public ngOnInit(): void {
        this.width$ = this.settings$.pipe(map(settings => processSettingValueWithUnit(settings.width)));

        this.height$ = this.settings$.pipe(map(settings => processSettingValueWithUnit(settings.height)));
    }
}
