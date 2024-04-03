import { AbstractEditorSelectionService, EDITOR_SELECTED_ELEMENT, ELEMENT_ID, ROOT_ELEMENT_ID } from "@modules/constructor";
import { Directive, HostBinding, HostListener, OnInit, inject } from "@angular/core";
import { Observable, map } from "rxjs";
import { toObservable } from "@angular/core/rxjs-interop";

@Directive({
    selector: "[toggleSelection]",
    standalone: true,
})
export class ToggleSelectionDirective implements OnInit {
    private readonly elementId = inject(ELEMENT_ID);

    private readonly selectedElement = inject(EDITOR_SELECTED_ELEMENT);

    private readonly selectedElement$ = toObservable(this.selectedElement);

    private readonly service = inject(AbstractEditorSelectionService);

    @HostBinding("$.class._selected")
    @HostListener("$.class._selected")
    public isSelected$: Observable<boolean>;

    @HostListener("click.stop")
    public toggleSelection(): void {
        const selectionCondition = this.elementId === ROOT_ELEMENT_ID && this.selectedElement() === ROOT_ELEMENT_ID;

        if (selectionCondition) {
            return;
        }

        this.service.updateSelection(this.elementId ?? ROOT_ELEMENT_ID);
    }

    public ngOnInit(): void {
        this.isSelected$ = this.selectedElement$.pipe(map(selectedIndex => selectedIndex === this.elementId));
    }
}
