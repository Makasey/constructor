import { ChangeDetectionStrategy, Component, HostBinding, input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { DragDropModule } from "@angular/cdk/drag-drop";

import { Observable } from "rxjs";

import { AbstractAwesomeTableService, TableExtra, TableMeta, TemplateMap } from "@components";

@Component({
    selector: "lz-table-head",
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: "./table-head.component.html",
    standalone: true,
    imports: [CommonModule, FormsModule, DragDropModule],
})
export class LZTableHeadComponent {
    @HostBinding("class.table-head")
    public hostClass = true;

    public templateMap = input<TemplateMap>({});

    public tableExtra = input<Partial<TableExtra>>({});

    public tableMeta = input<TableMeta[]>([]);

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
