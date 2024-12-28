import { Directive, input, contentChild } from "@angular/core";

import { LZAccordionContentDirective } from "@components";

@Directive({
    selector: "lz-accordion-item",
    standalone: true,
})
export class LZAccordionItemDirective {
    public readonly title = input.required<string>();
    public readonly disabled = input(false);
    public readonly expanded = input(true);
    readonly content = contentChild(LZAccordionContentDirective);
}
