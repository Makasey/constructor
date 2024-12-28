import { Directive, ViewContainerRef } from "@angular/core";

@Directive({ selector: "[hostModalContent]" })
export class HostModalContentDirective {
    constructor(public viewContainerRef: ViewContainerRef) {}
}
