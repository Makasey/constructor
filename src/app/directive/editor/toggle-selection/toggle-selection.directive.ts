import { AbstractEditorSelectionService, EDITOR_SELECTED_ELEMENT, EDITOR_SELECTED_PAGE, ELEMENT_ID } from "@modules/constructor";
import { Directive, HostListener, Injector, OnInit, computed, inject } from "@angular/core";
import { hostBinding } from "@modules/constructor/utils/host-binding";

@Directive({
    selector: "[toggleSelection]",
    standalone: true,
})
export class ToggleSelectionDirective implements OnInit {
    private readonly elementId = inject(ELEMENT_ID);

    private readonly selectedElement = inject(EDITOR_SELECTED_ELEMENT);

    private readonly selectedPage = inject(EDITOR_SELECTED_PAGE);

    private readonly injector = inject(Injector);

    private readonly service = inject(AbstractEditorSelectionService);

    @HostListener("click.stop")
    public toggleSelection(): void {
        const selectionCondition = this.elementId === this.selectedPage() && this.selectedElement() === this.selectedPage();

        if (this.elementId === "") {
            this.service.selectElement(this.selectedPage());

            return;
        }

        if (selectionCondition) {
            return;
        }

        this.service.updateSelection(this.elementId ?? this.selectedPage());
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
