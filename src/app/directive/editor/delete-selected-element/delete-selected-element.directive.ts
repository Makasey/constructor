import { AbstractEditorElementActionsService, EDITOR_SELECTED_ELEMENT, ROOT_ELEMENT_ID } from "@modules/constructor";
import { Directive, HostListener, inject } from "@angular/core";

@Directive({
    selector: "[deleteSelectedElement]",
    standalone: true,
})
export class DeleteSelectedElementDirective {
    private readonly selectedElement = inject(EDITOR_SELECTED_ELEMENT);

    private readonly service = inject(AbstractEditorElementActionsService);

    @HostListener("document:keydown.delete.stop.silent")
    public deleteElement(): void {
        if (this.selectedElement() === ROOT_ELEMENT_ID) {
            return;
        }

        this.service.deleteElement(this.selectedElement());
    }
}
