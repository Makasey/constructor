import { Directive, Input, contentChild, input } from "@angular/core";

import { LZAccordionContentDirective } from "@components";

@Directive({
    selector: "lz-accordion-item",
    standalone: true,
})
export class LZAccordionItemDirective {
    public readonly title = input.required<string>();

    public readonly disabled = input(false);

    @Input()
    public expanded = false;

    public readonly content = contentChild(LZAccordionContentDirective);
}
