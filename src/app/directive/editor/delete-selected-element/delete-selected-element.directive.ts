import { AbstractEditAreaService } from "@modules/constructor/components/edit-area/edit-area.service";
import { Directive, HostListener, inject } from "@angular/core";
import { EDITOR_SELECTED_ELEMENT } from "@modules/constructor/providers/selected-element.provider";
import { ROOT_ELEMENT_ID } from "@modules/constructor/components/edit-area/types";
import { toSignal } from "@angular/core/rxjs-interop";

@Directive({
    selector: "[deleteSelectedElement]",
    standalone: true,
})
export class DeleteSelectedElementDirective {
    private readonly selectedElement = toSignal(inject(EDITOR_SELECTED_ELEMENT), { initialValue: 0 });

    private readonly service = inject(AbstractEditAreaService);

    @HostListener("document:keydown.delete.stop.silent")
    public deleteElement(): void {
        if (this.selectedElement() === ROOT_ELEMENT_ID) {
            return;
        }

        this.service.deleteElement(this.selectedElement());
    }
}
