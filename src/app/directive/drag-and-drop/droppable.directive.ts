import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2, inject } from "@angular/core";
import { DragDropService } from "@shared-directives/drag-and-drop/dragDrop.service";

@Directive({
    selector: "[lzDroppable]",
    standalone: true,
})
export class DroppableDirective {
    private readonly el: ElementRef<HTMLElement> = inject(ElementRef);
    private readonly renderer: Renderer2 = inject(Renderer2);
    private readonly dragDropService: DragDropService = inject(DragDropService);

    @Input() public lzDroppable = true; // todo 'true' for test
    @Output() public readonly itemDropped = new EventEmitter<unknown>();

    @HostListener("mouseenter", ["$event"])
    public onDragEnter(event: MouseEvent): void {
        console.log("mouseenter trigger");
        console.log("this.el", this.el);
        console.log("this.lzDroppable==>", this.lzDroppable);
        event.preventDefault();
        if (this.lzDroppable) {
            this.renderer.setStyle(this.el.nativeElement, "border", "1px dashed #475A68");
        }
    }

    @HostListener("mouseleave", ["$event"])
    public onDragLeave(event: MouseEvent): void {
        console.log("triggered mouseleave");
        event.preventDefault();
        this.renderer.removeStyle(this.el.nativeElement, "border");
    }

    @HostListener("mouseup", ["$event"])
    public onDrop(event: MouseEvent): void {
        console.log("triggered mouseup");
        event.preventDefault();
        if (this.lzDroppable && this.dragDropService.draggedItem) {
            this.itemDropped.emit(this.dragDropService.draggedItem);
            this.renderer.removeStyle(this.el.nativeElement, "border");
            this.dragDropService.clearDraggedItem();
        }
    }
}
