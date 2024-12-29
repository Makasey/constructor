import { DropListRef } from "@angular/cdk/drag-drop";

export function applyPatch(): void {
    DropListRef.prototype._getSiblingContainerFromPosition = function (item, x, y): DropListRef | undefined {
        // @ts-expect-error this fix need to correct the behavior of nested lists in CDK
        return [...this._siblings].reverse().find(sibling => sibling._canReceive(item, x, y));
    };
}
