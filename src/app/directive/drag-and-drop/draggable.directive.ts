import { Directive, ElementRef, HostListener, Renderer2, inject } from "@angular/core";

@Directive({
    selector: "[lzDraggable]",
    standalone: true,
})
export class DraggableDirective {
    private isDragging = false;

    private el = inject(ElementRef);
    private renderer = inject(Renderer2);

    @HostListener("mousedown", ["$event"])
    public onMouseDown(event: MouseEvent): void {
        event.stopPropagation();
        this.isDragging = true;
    }

    @HostListener("document:mouseup", ["$event"])
    public onMouseUp(event: MouseEvent): void {
        if (this.isDragging) {
            this.isDragging = false;
        }
    }

    @HostListener("document:mousemove", ["$event"])
    public onMouseMove(event: MouseEvent): void {
        if (this.isDragging) {
            const offsetX = event.clientX - this.el.nativeElement.getBoundingClientRect().left;
            const offsetY = event.clientY - this.el.nativeElement.getBoundingClientRect().top;
            this.renderer.setStyle(this.el.nativeElement, "transform", `translate(${offsetX}px, ${offsetY}px)`);
        }
    }
}
