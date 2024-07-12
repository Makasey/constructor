import { DOCUMENT } from "@angular/common";
import { Injectable, WritableSignal, inject, signal } from "@angular/core";
import { debounceTime, filter, from, fromEvent, map, Observable, shareReplay, skipWhile } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class DragDropService {
    private readonly document = inject(DOCUMENT);

    public draggedItem: WritableSignal<unknown | null> = signal(null);

    public readonly moveEvent$: Observable<{ x: number; y: number }> = fromEvent<MouseEvent>(this.document, "mousemove").pipe(
        filter(() => {
            return !!this.draggedItem();
        }),
        debounceTime(10),
        map(event => {
            console.log(event);

            return {
                x: event.clientX,
                y: event.clientY,
            };
        }),
        shareReplay(1),
    );

    public readonly mouseUpEvent$: Observable<MouseEvent> = fromEvent<MouseEvent>(this.document, "mouseup").pipe(filter(() => !!this.draggedItem()));

    public readonly isIntersect$: Observable<string | null> = this.moveEvent$.pipe(map(coords => this.isIntersect(coords), shareReplay(1)));

    private readonly dropAreaMap: Map<string, { container: HTMLElement; name: string }> = new Map();

    public setDraggedItem(item: unknown): void {
        this.draggedItem.set(item);
    }

    public clearDraggedItem(): void {
        this.draggedItem.set(null);
    }

    public addDropArea(id: string, dropArea: { container: HTMLElement; name: string }): void {
        this.dropAreaMap.set(id, dropArea);
    }

    public removeDropArea(id: string): void {
        this.dropAreaMap.delete(id);
    }

    public isIntersect({ x, y }: { x: number; y: number }): string | null {
        let name: string | null = null;

        for (const [key] of this.dropAreaMap) {
            const { x: rectX, y: rectY, height, width } = this.calculateDropAreaCoords(key);

            if (x >= rectX && x <= rectX + width && y >= rectY && y <= rectY + height) {
                name = key;
            }
        }

        return name;
    }

    private calculateDropAreaCoords(id: string): { x: number; y: number; height: number; width: number } {
        const element = this.dropAreaMap.get(id);

        if (!element) {
            return { x: 0, y: 0, width: 0, height: 0 };
        }

        const { x, y, height, width } = element.container.getBoundingClientRect();

        return { x, y, height, width };
    }
}
