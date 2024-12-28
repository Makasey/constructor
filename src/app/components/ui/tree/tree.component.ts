import {
    ChangeDetectionStrategy,
    Component,
    HostBinding,
    HostListener,
    Inject,
    Optional,
    SkipSelf,
    ViewEncapsulation,
    input,
    output,
} from "@angular/core";

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
})
export class TreeComponent {
    @HostBinding("class.lz-tree")
    public hostClass = true;

    @HostListener("click.stop", ["$event"])
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
