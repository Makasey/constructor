import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output } from "@angular/core";

import { TableExtra, TableMeta, TableRow, TableValueExtraInternal, TemplateMap } from "@components/ui";

@Component({
    selector: "lz-table-body",
    templateUrl: "./table-body.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableBodyComponent {
    @HostBinding("class.table-body")
    public hostClass = true;

    @Input()
    public templateMap: TemplateMap = {};

    @Input()
    public tableMeta: TableMeta[] = [];

    @Input()
    public tableRows: TableRow[] = [];

    @Input()
    public tableExtra: Partial<TableExtra> = {};

    @Input()
    public valuesExtra: TableValueExtraInternal = {};

    @Input()
    public trackByRow: (index: number, row: unknown) => unknown;

    @Output()
    public rowScrolledBottom: EventEmitter<boolean> = new EventEmitter<boolean>();

    public onBottomScrolled(event: boolean): void {
        this.rowScrolledBottom.emit(event);
    }
}
