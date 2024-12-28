import {
    AbstractEditorElementActionsService,
    AbstractEditorElementSettingsService,
    AccordionItemPageElement,
    AccordionItemPageElementSettings,
    ELEMENT_ID,
    LZEditorElementComponent,
    processBackgroundValue,
} from "@modules/constructor";
import { ChangeDetectionStrategy, Component, HostBinding, HostListener, OnInit, Signal, ViewEncapsulation, inject } from "@angular/core";

import { ElementResolverDirective, TabSelectionDirective, ToggleSelectionDirective } from "@shared-directives";
import { Observable, map } from "rxjs";
import { animate, state, style, transition, trigger } from "@angular/animations";
import { toSignal } from "@angular/core/rxjs-interop";

@Component({
    selector: "lz-accordion-element-item",
    imports: [ElementResolverDirective, LZEditorElementComponent],
    templateUrl: "./accordion-element-item.component.html",
    styleUrl: "./accordion-element-item.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    hostDirectives: [TabSelectionDirective, ToggleSelectionDirective],
    animations: [
        trigger("contentExpansion", [
            state("expanded", style({ "min-height": "100px", opacity: 1, visibility: "visible" })),
            state("collapsed", style({ height: "0px", opacity: 0, visibility: "hidden" })),
            transition("expanded <=> collapsed", animate("500ms cubic-bezier(.37,1.04,.68,.98)")),
        ]),
    ]
})
export class AccordionElementItemComponent implements OnInit {
    @HostBinding("class.lz-accordion-element-item")
    public hostClass = true;

    @HostBinding("$.style.background")
    @HostListener("$.style.background")
    public background$: Observable<string>;

    public expanded = false;

    public readonly ELEMENT_ID = inject(ELEMENT_ID);

    private readonly editorElementActionsService = inject(AbstractEditorElementActionsService);

    private readonly elementSettingsService = inject(AbstractEditorElementSettingsService);

    private settings$: Observable<AccordionItemPageElementSettings> = this.elementSettingsService.selectSettings(this.ELEMENT_ID);

    public element: Signal<AccordionItemPageElement> = toSignal(this.editorElementActionsService.selectElement(this.ELEMENT_ID));

    public ngOnInit(): void {
        this.background$ = this.settings$.pipe(map(settings => processBackgroundValue(settings.background)));
    }

    public toggleState(): void {
        this.expanded = !this.expanded;
    }
}
