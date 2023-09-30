import { AbstractEditorSelectionService } from "@modules/constructor";
import { Directive, HostBinding, HostListener, inject } from "@angular/core";

@Directive({
    selector: "[tabSelection]",
    standalone: true,
})
export class TabSelectionDirective {
    @HostBinding("attr.tabIndex")
    public attr = 1;

    private readonly service = inject(AbstractEditorSelectionService);

    @HostListener("keydown.tab.stop")
    public select(): void {
        this.service.tabSelection();
    }
}
