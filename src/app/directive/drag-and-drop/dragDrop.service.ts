import { Injectable, WritableSignal, signal } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class DragDropService {
    public draggedItem: WritableSignal<unknown | null> = signal(null);

    public setDraggedItem(item: unknown): void {
        this.draggedItem.set(item);
    }

    public clearDraggedItem(): void {
        this.draggedItem.set(null);
    }
}
