import { AbstractEditorSelectionService, EDITOR_SELECTED_ELEMENT, ELEMENT_ID, ROOT_ELEMENT_ID } from "@modules/constructor";
import { ChangeDetectorRef, Directive, HostListener, Injector, OnInit, computed, inject } from "@angular/core";
import { hostBinding } from "@modules/constructor/utils/host-binding";

@Directive({
    selector: "[toggleSelection]",
    standalone: true,
})
export class ToggleSelectionDirective implements OnInit {
    private readonly elementId = inject(ELEMENT_ID);

    private readonly selectedElement = inject(EDITOR_SELECTED_ELEMENT);

    private readonly cdr = inject(ChangeDetectorRef);

    private readonly injector = inject(Injector);

    private readonly service = inject(AbstractEditorSelectionService);

    @HostListener("click.stop")
    public toggleSelection(): void {
        const selectionCondition = this.elementId === ROOT_ELEMENT_ID && this.selectedElement() === ROOT_ELEMENT_ID;

        if (selectionCondition) {
            return;
        }

        this.service.updateSelection(this.elementId ?? ROOT_ELEMENT_ID);
    }

    public ngOnInit(): void {
        hostBinding(
            computed(() => {
                return this.selectedElement() === this.elementId;
            }),
            "class._selected",
            this.injector,
        );
    }
}
