import { DropListRef } from "@angular/cdk/drag-drop";

export function applyPatch(): void {
    DropListRef.prototype._getSiblingContainerFromPosition = function (item, x, y): DropListRef | undefined {
        return;
        // [...this._siblings].reverse().find(sibling => sibling._canReceive(item, x, y));
    };
}
