import { ChangeDetectionStrategy, Component, HostBinding, input, WritableSignal } from "@angular/core";

import { AbstractAwesomeTableService, TableExtra, TableMeta, TemplateMap } from "@components";
import { Observable } from "rxjs";

@Component({
    selector: "lz-table-head",
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: "./table-head.component.html",
})
export class TableHeadComponent {
    @HostBinding("class.table-head")
    public hostClass = true;

    public templateMap: WritableSignal<TemplateMap> = input({});

    public tableExtra: WritableSignal<Partial<TableExtra>> = input({});

    public tableMeta: WritableSignal<TableMeta[]> = input([]);

    public isDragging$: Observable<boolean> = this.service.isDragging$;

    constructor(private service: AbstractAwesomeTableService) {}

    public selectAllRowsHandler(): void {
        if(this.tableExtra().selectAll) {
            this.service.deselectAllRows()

            return;
        }

        this.service.selectAllRows();
    }

    public startColumnDrag(): void {
        this.service.startDragging();
    }

    public endColumnDrag(): void {
        this.service.endDragging();
    }
}
