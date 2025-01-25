import { AbstractEditorElementActionsService, EDITOR_SELECTED_ELEMENT, EDITOR_SELECTED_PAGE } from "@modules/constructor";
import { Directive, HostListener, inject } from "@angular/core";

@Directive({
    selector: "[deleteSelectedElement]",
    standalone: true,
})
export class DeleteSelectedElementDirective {
    private readonly selectedElement = inject(EDITOR_SELECTED_ELEMENT);

    private readonly selectedPage = inject(EDITOR_SELECTED_PAGE);

    private readonly service = inject(AbstractEditorElementActionsService);

    @HostListener("document:keydown.delete.stop.silent")
    public deleteElement(): void {
        if (this.selectedElement() === this.selectedPage()) {
            return;
        }

        this.service.deleteElement(this.selectedElement());
    }
}
