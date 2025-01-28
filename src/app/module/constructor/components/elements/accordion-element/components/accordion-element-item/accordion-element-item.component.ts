import { AccordionItemPageElement, processBackgroundValue } from "@modules/constructor";
import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from "@angular/core";

import { BaseElementAbstract } from "@modules/constructor/components/elements/base-element/base-element.abstract";
import { LZEditorElementFlexComponent } from "@modules/constructor/components/editor-element/components/editor-element-flex/editor-element-flex.component";
import { TabSelectionDirective, ToggleSelectionDirective } from "@shared-directives";
import { animate, state, style, transition, trigger } from "@angular/animations";
import { hostBinding } from "@modules/constructor/utils/host-binding";

@Component({
    selector: "lz-accordion-element-item",
    templateUrl: "./accordion-element-item.component.html",
    styleUrl: "./accordion-element-item.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [LZEditorElementFlexComponent],
    hostDirectives: [TabSelectionDirective, ToggleSelectionDirective],
    standalone: true,
    host: {
        class: "lz-accordion-element-item",
    },
    animations: [
        trigger("contentExpansion", [
            state("expanded", style({ "min-height": "100px", opacity: 1, visibility: "visible" })),
            state("collapsed", style({ height: "0px", opacity: 0, visibility: "hidden" })),
            transition("expanded <=> collapsed", animate("500ms cubic-bezier(.37,1.04,.68,.98)")),
        ]),
    ],
})
export class AccordionElementItemComponent extends BaseElementAbstract<AccordionItemPageElement> implements OnInit {
    public expanded = false;

    public ngOnInit(): void {
        hostBinding(this.selectSlice("background", processBackgroundValue), "style.background", this.injector);
    }

    public toggleState(): void {
        this.expanded = !this.expanded;
    }
}
