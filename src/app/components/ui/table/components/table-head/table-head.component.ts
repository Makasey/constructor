import { ChangeDetectionStrategy, Component, HostBinding, Input } from "@angular/core";

import { AbstractAwesomeTableService, TableExtra, TableMeta, TemplateMap } from "@components/ui";
import { Observable } from "rxjs";

@Component({
    selector: "lz-table-head",
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: "./table-head.component.html",
})
export class TableHeadComponent {
    @HostBinding("class.table-head")
    public hostClass = true;

    @Input()
    public templateMap: TemplateMap = {};

    @Input()
    public tableExtra: Partial<TableExtra> = {};

    @Input()
    public tableMeta: TableMeta[] = [];

    public isDragging$: Observable<boolean> = this.service.selectIsDragging();

    constructor(private service: AbstractAwesomeTableService) {}

    public trackByFieldKey(index: number, cell: TableMeta): string {
        return cell.fieldKey;
    }

    public selectAllRowsHandler(event: Event): void {
        event.stopPropagation();

        !this.tableExtra.selectAll ? this.service.selectAllRows() : this.service.deselectAllRows();
    }

    public startColumnDrag(): void {
        this.service.startDragging();
    }

    public endColumnDrag(): void {
        this.service.endDragging();
    }
}
