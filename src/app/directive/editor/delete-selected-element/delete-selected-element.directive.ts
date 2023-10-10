import { AbstractEditorElementActionsService, EDITOR_SELECTED_ELEMENT, ROOT_ELEMENT_ID } from "@modules/constructor";
import { Directive, HostListener, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";

@Directive({
    selector: "[deleteSelectedElement]",
    standalone: true,
})
export class DeleteSelectedElementDirective {
    private readonly selectedElement = toSignal(inject(EDITOR_SELECTED_ELEMENT), { initialValue: "" });

    private readonly service = inject(AbstractEditorElementActionsService);

    @HostListener("document:keydown.delete.stop.silent")
    public deleteElement(): void {
        if (this.selectedElement() === ROOT_ELEMENT_ID) {
            return;
        }

        this.service.deleteElement(this.selectedElement());
    }
}
