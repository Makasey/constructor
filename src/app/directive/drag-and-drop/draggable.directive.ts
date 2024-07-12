import { DestroyRef, Directive, ElementRef, HostListener, Injector, Input, OnInit, Renderer2, WritableSignal, inject, signal } from "@angular/core";
import { DragDropService } from "@shared-directives/drag-and-drop/dragDrop.service";
import { copyCloneNodeStyles } from "./utils";
import { filter, tap } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Directive({
    selector: "[lzDraggable]",
    standalone: true,
})
export class DraggableDirective implements OnInit {
    private readonly el: ElementRef<HTMLElement> = inject(ElementRef);
    private readonly injector = inject(Injector);
    private readonly destroyRef = inject(DestroyRef);
    private readonly renderer: Renderer2 = inject(Renderer2);
    private readonly dragDropService: DragDropService = inject(DragDropService);
    private readonly clone: WritableSignal<HTMLElement | null> = signal(null);
    private readonly target: WritableSignal<HTMLElement | null> = signal(null);
    private readonly isMove = signal(false);
    private readonly mouseUpEvent$ = this.dragDropService.mouseUpEvent$;

    public ngOnInit(): void {
        this.dragDropService.moveEvent$
            .pipe(
                filter(() => !!this.clone()),
                tap(({ x, y }) => {
                    this.renderer.setStyle(this.clone(), "left", x - this.offsetX + "px");
                    this.renderer.setStyle(this.clone(), "top", y + this.offsetY - (this.target()?.clientHeight ?? 0) + "px");
                }),
                takeUntilDestroyed(this.destroyRef),
            )
            .subscribe();

        this.mouseUpEvent$
            .pipe(
                filter(() => {
                    return !!this.clone();
                }),
                tap(() => {
                    this.renderer.removeChild(document.body, this.clone());
                    this.resetDraggableState();
                }),
                takeUntilDestroyed(this.destroyRef),
            )
            .subscribe();
    }

    @Input() public lzDraggable: unknown;

    private offsetX = 0;
    private offsetY = 0;

    private resetDraggableState(): void {
        this.isMove.set(false);
        this.clone.set(null);
        this.target.set(null);
    }

    @HostListener("mousedown", ["$event"])
    public onDragStart(event: MouseEvent): void {
        event.preventDefault();

        this.isMove.set(true);
        this.dragDropService.setDraggedItem(this.lzDraggable);
        this.target.set(this.el.nativeElement);
        this.clone.set(this.el.nativeElement.cloneNode(true) as unknown as HTMLElement);

        this.processOffset(event);
        this.processCloneElement(event);
    }

    private processOffset(event: MouseEvent): void {
        const rect = this.el.nativeElement.getBoundingClientRect();

        this.offsetX = event.clientX - rect.left;
        this.offsetY = event.clientY - rect.top;
    }

    private processCloneElement(event: MouseEvent): void {
        const clone = this.clone();
        const target = this.target();

        if (!clone || !target) {
            return;
        }

        copyCloneNodeStyles(target, clone, this.injector);

        this.renderer.setStyle(clone, "position", "fixed");
        this.renderer.setStyle(clone, "left", event.screenX - this.offsetX + "px");
        this.renderer.setStyle(clone, "top", event.screenY + this.offsetY - target?.clientHeight + "px");
        this.renderer.setStyle(clone, "width", target?.clientWidth + "px");
        this.renderer.setStyle(clone, "height", target?.clientHeight + "px");
        document.body.appendChild(clone);
    }
}
