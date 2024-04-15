import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: "lz-page-elements-tree",
    templateUrl: "./page-elements-tree.component.html",
    styleUrl: "./page-elements-tree.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [],
})
export class PageElementsTreeComponent {}
