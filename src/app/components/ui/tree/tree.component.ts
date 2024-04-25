import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    HostBinding,
    HostListener,
    Inject,
    Input,
    Optional,
    Output,
    SkipSelf,
    ViewEncapsulation,
} from "@angular/core";
import { NgFor, NgIf } from "@angular/common";

export type Tree<V = string> = {
    value: V;
    children: Tree<V>[];
    label?: string;
};

@Component({
    selector: "lz-tree",
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ["./tree.component.scss"],
    imports: [NgFor, NgIf],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    templateUrl: "./tree.component.html",
})
export class TreeComponent {
    @HostBinding("class.lz-tree")
    public hostClass = true;

    @HostListener("click.stop", ["$event"])
    public toggleTree(): void {
        this.closed = !this.closed;
    }

    @Input({
        required: true,
    })
    public tree: Tree;

    @Output()
    public readonly emitTree: EventEmitter<Tree> = new EventEmitter<Tree>();

    public emit(tree: Tree): void {
        this.emitTree.emit(tree);
    }

    public closed = false;

    constructor(@SkipSelf() @Optional() @Inject(TreeComponent) public parent: TreeComponent) {}
}
