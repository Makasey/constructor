import { Directive, ElementRef, EventEmitter, OnInit, Output, Renderer2, inject, input } from "@angular/core";
import { DragDropService } from "@shared-directives/drag-and-drop/dragDrop.service";
import { ELEMENT_ID } from "@modules/constructor";
import { LZDropEvent } from "./types";
import { debounceTime, distinctUntilChanged, filter, tap, withLatestFrom } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Directive({
    selector: "[lzDroppable]",
    standalone: true,
})
export class DroppableDirective implements OnInit {
    private readonly el: ElementRef<HTMLElement> = inject(ElementRef);

    private readonly renderer: Renderer2 = inject(Renderer2);

    private readonly dragDropService: DragDropService = inject(DragDropService);

    public readonly id = input(inject(ELEMENT_ID));

    private readonly droppableEvent$ = this.dragDropService.mouseUpEvent$.pipe(
        withLatestFrom(this.dragDropService.isIntersect$),
        filter(([, name]) => name === this.id() && !!this.dragDropService.draggedItem()),
        tap(([, name]) => {
            const dragArea = this.dragDropService.getDragArea(name!);

            this.itemDropped.emit({
                data: this.dragDropService.draggedItem(),
                ...dragArea,
            });

            this.renderer.removeStyle(this.el.nativeElement, "border");
        }),
        debounceTime(0),
        tap(() => this.dragDropService.clearDraggedItem()),
        takeUntilDestroyed(),
    );

    private readonly mouseEnterEvent$ = this.dragDropService.isIntersect$.pipe(
        filter(intersectionName => {
            return intersectionName === this.id();
        }),
        tap(() => {
            if (this.dragDropService.draggedItem()) {
                this.renderer.setStyle(this.el.nativeElement, "border", "1px dashed #475A68");
            }
        }),
        takeUntilDestroyed(),
    );

    private readonly mouseLeaveEvent$ = this.dragDropService.isIntersect$.pipe(
        distinctUntilChanged((prev, next) => {
            return prev !== this.id() && next === this.id();
        }),
        tap(() => {
            if (this.dragDropService.draggedItem()) {
                this.renderer.removeStyle(this.el.nativeElement, "border");
            }
        }),
        takeUntilDestroyed(),
    );

    @Output() public readonly itemDropped = new EventEmitter<LZDropEvent>();

    public ngOnInit(): void {
        this.dragDropService.addDropArea(this.id(), { container: this.el.nativeElement, name: this.id() });

        this.droppableEvent$.subscribe();
        this.mouseEnterEvent$.subscribe();
        this.mouseLeaveEvent$.subscribe();
    }
}
