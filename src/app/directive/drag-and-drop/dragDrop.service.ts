import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class DragDropService {
    public draggedItem: unknown | null = null;

    public setDraggedItem(item: unknown): void {
        this.draggedItem = item;
    }

    public clearDraggedItem(): void {
        this.draggedItem = null;
    }
}
