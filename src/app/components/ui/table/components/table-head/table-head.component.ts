import { ChangeDetectionStrategy, Component, HostBinding, input, WritableSignal } from "@angular/core";
import { AsyncPipe, NgTemplateOutlet, NgClass, NgStyle } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { DragDropModule } from "@angular/cdk/drag-drop";

import { Observable } from "rxjs";

import { AbstractAwesomeTableService, TableExtra, TableMeta, TemplateMap } from "@components";

@Component({
    selector: "lz-table-head",
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: "./table-head.component.html",
    standalone: true,
    imports: [AsyncPipe, NgTemplateOutlet, FormsModule, NgClass, NgStyle, DragDropModule],
})
export class LZTableHeadComponent {
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
