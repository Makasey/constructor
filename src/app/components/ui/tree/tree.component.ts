import {
    ChangeDetectionStrategy,
    Component,
    HostBinding,
    HostListener,
    Inject,
    Input,
    OnInit,
    Optional,
    SkipSelf,
    ViewEncapsulation,
} from "@angular/core";
import { NgFor, NgIf } from "@angular/common";

export type Tree<V = number> = {
    value: V;
    children: Tree<V>[];
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
export class TreeComponent implements OnInit {
    @HostBinding("class.lz-tree")
    public hostClass = true;

    @HostListener("click", ["$event"])
    public toggleTree(event: PointerEvent): void {
        event.stopPropagation();

        this.closed = !this.closed;
    }

    @Input({
        required: true,
    })
    public tree: Tree;

    public closed = false;

    constructor(@SkipSelf() @Optional() @Inject(TreeComponent) public parent: TreeComponent) {}

    public ngOnInit(): void {
        console.log(this.tree, this.parent);
    }
}
