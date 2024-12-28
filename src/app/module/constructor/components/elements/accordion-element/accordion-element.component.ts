import {
    AbstractEditorElementActionsService,
    AbstractEditorElementSettingsService,
    AccordionPageElement,
    AccordionPageElementSettings,
    ELEMENT_ID,
    LZEditorElementComponent,
    processDirectionValue,
    processSettingValueWithUnit,
} from "@modules/constructor";
import { ChangeDetectionStrategy, Component, HostBinding, HostListener, OnInit, Signal, ViewEncapsulation, inject } from "@angular/core";

import { ElementResolverDirective, TabSelectionDirective, ToggleSelectionDirective } from "@shared-directives";
import { Observable, map } from "rxjs";
import { toSignal } from "@angular/core/rxjs-interop";

@Component({
    selector: "lz-accordion-element",
    imports: [ElementResolverDirective, LZEditorElementComponent],
    templateUrl: "./accordion-element.component.html",
    styleUrl: "./accordion-element.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    hostDirectives: [TabSelectionDirective, ToggleSelectionDirective]
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

    @HostBinding("$.style.padding")
    @HostListener("$.style.padding")
    public padding$: Observable<string>;

    @HostBinding("$.style.margin")
    @HostListener("$.style.margin")
    public margin$: Observable<string>;

    public readonly ELEMENT_ID = inject(ELEMENT_ID);

    private readonly editorElementActionsService = inject(AbstractEditorElementActionsService);

    private readonly elementSettingsService = inject(AbstractEditorElementSettingsService);

    private settings$: Observable<AccordionPageElementSettings> = this.elementSettingsService.selectSettings(this.ELEMENT_ID);

    public element: Signal<AccordionPageElement> = toSignal(this.editorElementActionsService.selectElement(this.ELEMENT_ID));
    public ngOnInit(): void {
        this.width$ = this.settings$.pipe(map(settings => processSettingValueWithUnit(settings.width)));

        this.height$ = this.settings$.pipe(map(settings => processSettingValueWithUnit(settings.height)));

        this.padding$ = this.settings$.pipe(map(settings => processDirectionValue(settings.padding)));

        this.margin$ = this.settings$.pipe(map(settings => processDirectionValue(settings.margin)));
    }
}
