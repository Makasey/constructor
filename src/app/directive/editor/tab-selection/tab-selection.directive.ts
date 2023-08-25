import { AbstractEditAreaService } from "@modules/constructor/components/edit-area/edit-area.service";
import { Directive, HostBinding, HostListener, inject } from "@angular/core";

@Directive({
    selector: "[tabSelection]",
    standalone: true,
})
export class TabSelectionDirective {
    @HostBinding("attr.tabIndex")
    public attr = 1;

    private readonly service = inject(AbstractEditAreaService);

    @HostListener("keydown.tab.stop")
    public select(): void {
        this.service.tabSelection();
    }
}
