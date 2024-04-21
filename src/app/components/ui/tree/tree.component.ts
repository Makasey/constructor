import { ChangeDetectionStrategy, Component, HostBinding, HostListener, Inject, Input, Optional, SkipSelf, ViewEncapsulation } from "@angular/core";
import { NgFor, NgIf } from "@angular/common";

export type Tree<V = string | number> = {
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

    public closed = false;

    constructor(@SkipSelf() @Optional() @Inject(TreeComponent) public parent: TreeComponent) {}
}
