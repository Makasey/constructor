import { Coordinates, DragArea, RectangleCoordinates } from "./types";
import { DOCUMENT } from "@angular/common";
import { Injectable, WritableSignal, inject, signal } from "@angular/core";
import { Observable, debounceTime, filter, fromEvent, map, shareReplay } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class DragDropService {
    private readonly document = inject(DOCUMENT);

    public draggedItem: WritableSignal<unknown | null> = signal(null);

    public readonly moveEvent$: Observable<Coordinates> = fromEvent<MouseEvent>(this.document, "mousemove").pipe(
        filter(() => {
            return !!this.draggedItem();
        }),
        debounceTime(10),
        map(event => {
            return {
                x: event.clientX,
                y: event.clientY,
            };
        }),
        shareReplay(1),
    );

    public readonly mouseUpEvent$: Observable<MouseEvent> = fromEvent<MouseEvent>(this.document, "mouseup").pipe(filter(() => !!this.draggedItem()));

    public readonly isIntersect$: Observable<string | null> = this.moveEvent$.pipe(map(coords => this.isIntersect(coords), shareReplay(1)));

    private readonly dropAreaMap: Map<string, DragArea> = new Map();

    private readonly draggableCloneMap: Map<string, HTMLElement> = new Map();

    public setDraggedItem(item: unknown): void {
        this.draggedItem.set(item);
    }

    public setDraggableCloneMapItem(id: string, element: HTMLElement): void {
        this.draggableCloneMap.set(id, element);
    }

    public getDraggableClone(id: string): HTMLElement | undefined {
        return this.draggableCloneMap.get(id);
    }

    public deleteDraggableCloneMapItem(): void {
        for (const [key, value] of this.draggableCloneMap) {
            key && this.document.body.removeChild(value);
        }

        this.draggableCloneMap.clear();
    }

    public clearDraggedItem(): void {
        this.draggedItem.set(null);
    }

    public addDropArea(id: string, dropArea: { container: HTMLElement; name: string }): void {
        this.dropAreaMap.set(id, { ...dropArea, id: id });
    }

    public removeDropArea(id: string): void {
        this.dropAreaMap.delete(id);
    }

    public isIntersect({ x, y }: Coordinates): string | null {
        let name: string | null = null;

        for (const [key] of this.dropAreaMap) {
            const { x: rectX, y: rectY, height, width } = this.calculateDropAreaCoords(key);

            if (x >= rectX && x <= rectX + width && y >= rectY && y <= rectY + height) {
                name = key;
            }
        }

        return name;
    }

    public getDragArea(id: string): DragArea {
        return this.dropAreaMap.get(id)!;
    }

    private calculateDropAreaCoords(id: string): RectangleCoordinates {
        const element = this.dropAreaMap.get(id);

        if (!element) {
            return { x: 0, y: 0, width: 0, height: 0 };
        }

        const elementDisplay = element.container.computedStyleMap().get("display")?.toString();

        if (elementDisplay === "contents") {
            return this.calculateDropAreaContentsCoords(element.container);
        }

        const { x, y, height, width } = element.container.getBoundingClientRect();

        return { x, y, height, width };
    }

    private calculateDropAreaContentsCoords(element: HTMLElement): DOMRectReadOnly {
        const elements = Array.from(element.querySelectorAll("*"));

        return elements
            .map(item => item.getBoundingClientRect())
            .reduce((result, item) => {
                const x = Math.min(result.left, item.left);
                const y = Math.min(result.top, item.top);
                const width = Math.max(result.right, item.right) - x;
                const height = Math.max(result.bottom, item.bottom) - y;

                return new DOMRectReadOnly(x, y, width, height);
            });
    }
}
