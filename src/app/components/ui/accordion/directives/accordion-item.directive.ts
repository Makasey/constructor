import { AccordionContentDirective } from "@components/ui/accordion/directives/accordion-content.directive";
import { AccordionHeaderDirective } from "@components/ui/accordion/directives/accordion-header.directive";
import { ContentChild, Directive, Input } from "@angular/core";

@Directive({
    selector: "accordion-item",
    standalone: true,
})
export class AccordionItemDirective {
    @Input() public title: string;
    @Input() public disabled = false;
    @Input() public expanded = false;
    @ContentChild(AccordionContentDirective) public content: AccordionContentDirective;
    @ContentChild(AccordionHeaderDirective) public customHeader: AccordionHeaderDirective;
}
