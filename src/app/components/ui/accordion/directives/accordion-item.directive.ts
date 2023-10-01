import { ContentChild, Directive, Input } from "@angular/core";

import { LZAccordionContentDirective } from "@components";

@Directive({
    selector: "lz-accordion-item",
    standalone: true,
})
export class LZAccordionItemDirective {
    @Input({ required: true }) public title: string;
    @Input() public disabled = false;
    @Input() public expanded = true;
    @ContentChild(LZAccordionContentDirective) public content: LZAccordionContentDirective;
}
