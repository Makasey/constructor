import { ContentChild, Directive, Input } from "@angular/core";

import { AccordionContentDirective } from "@components/ui/accordion/directives/accordion-content.directive";

@Directive({
    selector: "accordion-item",
    standalone: true,
})
export class AccordionItemDirective {
    @Input() public title: string;
    @Input() public disabled = false;
    @Input() public expanded = false;
    @ContentChild(AccordionContentDirective) public content: AccordionContentDirective;
}
