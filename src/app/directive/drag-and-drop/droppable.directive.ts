import { Directive, ElementRef, EventEmitter, Injector, OnInit, Output, Renderer2, inject, input } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ELEMENT_ID } from "@modules/constructor";
import { DragDropService } from "@shared-directives/drag-and-drop/dragDrop.service";
import { debounceTime, distinctUntilChanged, filter, tap, withLatestFrom } from "rxjs";

@Directive({
    selector: "[lzDroppable]",
    standalone: true,
})
export class DroppableDirective implements OnInit {
    private readonly el: ElementRef<HTMLElement> = inject(ElementRef);

    private readonly injector = inject(Injector);

    private readonly renderer: Renderer2 = inject(Renderer2);

    private readonly dragDropService: DragDropService = inject(DragDropService);

    public readonly id = input(inject(ELEMENT_ID));

    private readonly droppableEvent$ = this.dragDropService.mouseUpEvent$.pipe(
        withLatestFrom(this.dragDropService.isIntersect$),
        debounceTime(0),
        tap(([, name]) => console.log(this.id, name)),
        filter(([, name]) => name === this.id()),
        tap(([, name]) => {
            console.log(name);
            this.itemDropped.emit(this.dragDropService.draggedItem());
            this.renderer.removeStyle(this.el.nativeElement, "border");

            this.dragDropService.clearDraggedItem();
        }),
        takeUntilDestroyed(),
    );

    private readonly mouseEnterEvent$ = this.dragDropService.isIntersect$.pipe(
        distinctUntilChanged((prev, next) => {
            return prev === this.id() && next !== this.id();
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

    @Output() public readonly itemDropped = new EventEmitter<unknown>();

    public ngOnInit(): void {
        this.dragDropService.addDropArea(this.id(), { container: this.el.nativeElement, name: this.id() });

        this.droppableEvent$.subscribe();
        this.mouseEnterEvent$.subscribe();
        this.mouseLeaveEvent$.subscribe();
    }
}
