import { Directive, TemplateRef } from "@angular/core";

@Directive({
    selector: "[lzAccordionContent]",
    standalone: true,
})
export class LZAccordionContentDirective {
    constructor(public readonly templateRef: TemplateRef<unknown>) {}
}
