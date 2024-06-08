import { Directive, ElementRef, HostListener, Input, Renderer2, inject } from "@angular/core";
import { DragDropService } from "@shared-directives/drag-and-drop/dragDrop.service";

@Directive({
    selector: "[lzDraggableV2]",
    standalone: true,
})
export class DraggableV2Directive {
    private readonly el: ElementRef<HTMLElement> = inject(ElementRef);
    private readonly renderer: Renderer2 = inject(Renderer2);
    private readonly dragDropService: DragDropService = inject(DragDropService);

    @Input() public lzDraggableV2: unknown;
    private offsetX = 0;
    private offsetY = 0;

    @HostListener("mousedown", ["$event"])
    public onDragStart(event: MouseEvent): void {
        event.preventDefault();
        this.dragDropService.setDraggedItem(this.lzDraggableV2);

        const rect = this.el.nativeElement.getBoundingClientRect();
        this.offsetX = event.clientX - rect.left;
        this.offsetY = event.clientY - rect.top;

        const target = event.target as HTMLElement;

        const clone = this.el.nativeElement.cloneNode(true);
        this.renderer.setStyle(clone, "position", "absolute");
        this.renderer.setStyle(clone, "left", event.clientX - this.offsetX + "px");
        this.renderer.setStyle(clone, "top", event.clientY - this.offsetY - target?.clientHeight + "px");
        this.renderer.setStyle(clone, "width", target?.clientWidth + "px");
        this.renderer.setStyle(clone, "height", target?.clientHeight + "px");
        this.renderer.setStyle(clone, "background-color", "red");
        document.body.appendChild(clone);

        const moveListener = this.renderer.listen("document", "mousemove", (moveEvent: MouseEvent) => {
            this.renderer.setStyle(clone, "left", moveEvent.clientX - this.offsetX + "px");
            this.renderer.setStyle(clone, "top", moveEvent.clientY - this.offsetY - target?.clientHeight + "px");
        });

        const upListener = this.renderer.listen("document", "mouseup", () => {
            moveListener();
            upListener();
            this.renderer.removeChild(document.body, clone);
            this.dragDropService.clearDraggedItem();
        });
    }
}
