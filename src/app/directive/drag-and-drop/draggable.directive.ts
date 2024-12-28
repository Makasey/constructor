import {
    DestroyRef,
    Directive,
    ElementRef,
    HostListener,
    Injector,
    OnDestroy,
    OnInit,
    Renderer2,
    WritableSignal,
    inject,
    input,
    signal,
} from "@angular/core";
import { DragDropService } from "@shared-directives/drag-and-drop/dragDrop.service";
import { copyCloneNodeStyles } from "./utils";
import { filter, tap } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Directive({
    selector: "[lzDraggable]",
    standalone: true,
})
export class DraggableDirective implements OnInit, OnDestroy {
    private readonly el: ElementRef<HTMLElement> = inject(ElementRef);
    private readonly injector = inject(Injector);
    private readonly destroyRef = inject(DestroyRef);
    private readonly renderer: Renderer2 = inject(Renderer2);
    private readonly dragDropService: DragDropService = inject(DragDropService);
    private readonly clone: WritableSignal<HTMLElement | null> = signal(null);
    private readonly target: WritableSignal<HTMLElement | null> = signal(null);
    private readonly isMove = signal(false);
    private readonly mouseUpEvent$ = this.dragDropService.mouseUpEvent$;

    public id = input.required<string>();
    public prohibitDrag = input<boolean>(false);

    public ngOnInit(): void {
        this.dragDropService.moveEvent$
            .pipe(
                filter(() => !!this.clone()),
                tap(({ x, y }) => {
                    const clone = this.clone();

                    this.renderer.setStyle(clone, "left", x - this.offsetX + "px");
                    this.renderer.setStyle(clone, "top", y + this.offsetY - (this.target()?.clientHeight ?? 0) + "px");
                }),
                takeUntilDestroyed(this.destroyRef),
            )
            .subscribe();

        this.mouseUpEvent$
            .pipe(
                tap(() => {
                    this.resetDraggableState();
                }),
                takeUntilDestroyed(this.destroyRef),
            )
            .subscribe();
    }

    public readonly lzDraggable = input<unknown>();

    private offsetX = 0;
    private offsetY = 0;

    private resetDraggableState(): void {
        this.isMove.set(false);
        this.removeClone();
        this.target.set(null);
    }

    @HostListener("mousedown.stop.prevent", ["$event"])
    public onDragStart(event: MouseEvent): void {
        if (!this.prohibitDrag()) {
            this.removeClone();
            this.isMove.set(true);
            this.dragDropService.setDraggedItem(this.lzDraggable());
            this.target.set(this.el.nativeElement);

            this.clone.set(this.el.nativeElement.cloneNode(true) as unknown as HTMLElement);

            this.processOffset(event);
            this.processCloneElement(event);
        }
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

    public ngOnDestroy(): void {
        this.removeClone();
    }

    private removeClone(): void {
        const clone = this.clone();

        if (this.clone()) {
            this.renderer.removeChild(document.body, clone);
        }
    }
}
