import { ChangeDetectionStrategy, Component, HostBinding, Input, Output, ViewEncapsulation } from "@angular/core";

import { BehaviorSubject, Observable } from "rxjs";
import { debounceTime, filter } from "rxjs/operators";

import {
    AbstractAwesomeTableService,
    RowPaddingType,
    TableExtra,
    TableMeta,
    TableRow,
    TableValueExtraInternal,
    TemplateMap,
    checkScrollPosition,
} from "@components";
import { shouldCall } from "app/decorators/should-call";

@Component({
    selector: "lz-table-row",
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: "./table-row.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class TableRowComponent {
    @HostBinding("class.table-row")
    public hostClass = true;

    @Input()
    public templatesMap: TemplateMap = {};

    @Input()
    public tableMeta: TableMeta[];

    @Input()
    public tableExtra: TableExtra;

    @Input()
    public valuesExtra: TableValueExtraInternal = {};

    @Input()
    public rowIndex: number;

    @Input()
    public highlighterId: string;

    @Input()
    public tableRow: TableRow = {};

    @Input()
    public trackByRow: (index: number, value: unknown) => unknown;

    @Output()
    public onBottomScrolled: Observable<boolean>;

    public _paddingType = RowPaddingType;

    public previousScrollPosition: number;

    public scrollBottomSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(private readonly service: AbstractAwesomeTableService) {
        this.onBottomScrolled = this.scrollBottomSubject$.pipe(
            debounceTime(100),
            filter(isEnd => isEnd),
        );
    }

    public get rowId(): string {
        return this.tableRow[this.tableExtra.idKey] as string;
    }

    @shouldCall(checkScrollPosition)
    public onRowScroll(event: Event): void {
        this.updateScrollBottomSubject(true);
    }

    public updateScrollBottomSubject(value: boolean): void {
        this.scrollBottomSubject$.next(value);
    }

    public onRowClick(tableRow: TableRow): void {
        const rowId: string = tableRow[this.tableExtra.idKey] as string;
        const item = this.valuesExtra[rowId];

        if (!item.disabled) {
            const isExpanded = item.isExpanded;

            isExpanded ? this.service.collapseRowById(rowId) : this.service.expandRowById(rowId);
        }
    }

    public onArrowClick(event: Event, row: TableRow): void {
        event.stopPropagation();

        const id = this.getChildRowId(row);
        const isOpened = this.valuesExtra[id].opened;

        isOpened ? this.service.closeRowById(id) : this.service.openRowById(id);
    }

    public trackByFieldKey(index: number, metaItem: TableMeta): string {
        return metaItem.fieldKey;
    }

    public onSelectRow(event: Event, id: string): void {
        event.stopPropagation();

        this.service.selectRowById(id);
    }

    private getChildRowId(child: TableRow): string {
        return child[this.tableExtra.idKey] as string;
    }
}
