import { ChangeDetectionStrategy, Component, HostBinding, Inject, Optional, SkipSelf, ViewEncapsulation, input, output } from "@angular/core";

export type Tree<V = string> = {
    value: V;
    children: Tree<V>[];
    label?: string;
};

@Component({
    selector: "lz-tree",
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ["./tree.component.scss"],
    imports: [],
    encapsulation: ViewEncapsulation.None,
    templateUrl: "./tree.component.html",
    standalone: true,
})
export class TreeComponent {
    @HostBinding("class.lz-tree")
    public hostClass = true;

    public toggleTree(): void {
        this.closed = !this.closed;
    }

    public readonly tree = input.required<Tree>();

    public readonly emitTree = output<Tree>();

    public emit(tree: Tree): void {
        this.emitTree.emit(tree);
    }

    public closed = false;

    constructor(@SkipSelf() @Optional() @Inject(TreeComponent) public parent: TreeComponent) {}
}
