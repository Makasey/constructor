import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

import { LZTableMeta } from "../../types";

@Component({
    selector: "lz-table-head",
    templateUrl: "./table-head.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableHeadComponent {
    @Input()
    public tableMeta!: LZTableMeta[];
}
