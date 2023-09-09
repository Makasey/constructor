import { Directive, TemplateRef } from "@angular/core";

@Directive({
    standalone: true,
    selector: "[accordionHeader]",
})
export class AccordionHeaderDirective {
    constructor(public templateRef: TemplateRef<unknown>) {}
}
