import { Directive, ElementRef, HostListener, Injector, Input, Renderer2, WritableSignal, inject, signal } from "@angular/core";
import { DragDropService } from "@shared-directives/drag-and-drop/dragDrop.service";
import { copyCloneNodeStyles } from "./utils";

@Directive({
    selector: "[lzDraggable]",
    standalone: true,
})
export class DraggableDirective {
    private readonly el: ElementRef<HTMLElement> = inject(ElementRef);
    private readonly injector = inject(Injector);
    private readonly renderer: Renderer2 = inject(Renderer2);
    private readonly dragDropService: DragDropService = inject(DragDropService);

    @Input() public lzDraggable: unknown;

    private offsetX = 0;
    private offsetY = 0;

    @HostListener("mousedown.prevent", ["$event"])
    public onDragStart(event: MouseEvent): void {
        this.dragDropService.setDraggedItem(this.lzDraggable);

        const rect = this.el.nativeElement.getBoundingClientRect();
        const target = event.target as HTMLElement;
        const clone = this.el.nativeElement.cloneNode(true) as unknown as HTMLElement;

        this.offsetX = event.clientX - rect.left;
        this.offsetY = event.clientY - rect.top;

        copyCloneNodeStyles(target, clone, this.injector);
        this.processCloneElement(event, clone, target);
        this.upListener(clone);
        this.moveListener(clone, target);
    }

    private processCloneElement(event: MouseEvent, clone: HTMLElement, target: HTMLElement): void {
        this.renderer.setStyle(clone, "position", "absolute");
        this.renderer.setStyle(clone, "left", event.screenX + this.offsetX + "px");
        this.renderer.setStyle(clone, "top", event.screenY + this.offsetY + target?.clientHeight + "px");
        this.renderer.setStyle(clone, "width", target?.clientWidth + "px");
        this.renderer.setStyle(clone, "height", target?.clientHeight + "px");
        document.body.appendChild(clone);
    }

    public moveListener(clone: HTMLElement, target: HTMLElement): void {
        this.renderer.listen("document", "mousemove", (moveEvent: MouseEvent) => {
            this.renderer.setStyle(clone, "left", moveEvent.clientX - this.offsetX + "px");
            this.renderer.setStyle(clone, "top", moveEvent.clientY + this.offsetY - target?.clientHeight + "px");
        });
    }

    public upListener(clone: HTMLElement): void {
        this.renderer.listen("document", "mouseup", () => {
            this.renderer.removeChild(document.body, clone);     
            this.dragDropService.clearDraggedItem();
        });
    }
}
