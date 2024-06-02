import { Directive, ElementRef, HostListener, Renderer2, inject } from "@angular/core";

export type DraggablePositionType = Record<string, number>;

@Directive({
    selector: "[lzDraggable]",
    standalone: true,
})
export class DraggableDirective {
    private readonly el: ElementRef<HTMLElement> = inject(ElementRef);
    private readonly renderer: Renderer2 = inject(Renderer2);

    private isDragging = false;

    private dragPosition: DraggablePositionType = {
        x: 0,
        y: 0,
    };

    private touchOffset: DraggablePositionType = {
        x: 0,
        y: 0,
    };

    @HostListener("mousedown", ["$event"])
    public onMouseDown(event: MouseEvent): void {
        event.preventDefault();
        this.isDragging = true;

        const { x, y } = this.prepareDragging(event);

        this.touchOffset.x = x - this.dragPosition.x;
        this.touchOffset.y = y - this.dragPosition.y;
    }

    @HostListener("document:mouseup", ["$event"])
    public onMouseUp(): void {
        if (this.isDragging) {
            this.isDragging = false;
        }
    }

    @HostListener("document:mousemove", ["$event"])
    public onMouseMove(event: MouseEvent): void {
        if (this.isDragging) {
            const { x, y } = this.prepareDragging(event);
            this.dragPosition.x = x - this.touchOffset.x;
            this.dragPosition.y = y - this.touchOffset.y;

            this.renderer.setStyle(this.el.nativeElement, "transform", `translate(${this.dragPosition.x}px, ${this.dragPosition.y}px)`);
        }
    }

    private prepareDragging(event: MouseEvent): DraggablePositionType {
        return {
            x: event.clientX,
            y: event.clientY,
        };
    }
}
