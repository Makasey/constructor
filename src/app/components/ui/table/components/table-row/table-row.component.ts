import { AsyncPipe, NgClass, NgStyle, NgTemplateOutlet } from "@angular/common";
import { ChangeDetectionStrategy, Component, HostBinding, Output, ViewEncapsulation, computed, input } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { DragDropModule } from "@angular/cdk/drag-drop";

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
import { LZInitVarDirective } from "@shared-directives/init-var";
import { shouldCall } from "@shared-decorators";

import { LZRowPaddingPipe } from "../../pipes";
import { TrackByFn } from "../../interfaces";
import { coerceNullableArray, coerceNullableObject, transformTrackBy } from "../../transformers";
import { defaultTrackBy } from "../../constants";

@Component({
    selector: "lz-table-row",
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: "./table-row.component.html",
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [AsyncPipe, LZInitVarDirective, LZRowPaddingPipe, NgTemplateOutlet, FormsModule, NgClass, NgStyle, DragDropModule],
})
export class LZTableRowComponent {
    @HostBinding("class.table-row")
    public hostClass = true;

    public templatesMap = input<TemplateMap>({});

    public tableMeta = input<TableMeta[], TableMeta[] | null>([], {
        transform: coerceNullableArray,
    });

    public tableExtra = input<TableExtra, TableExtra | null>({} as TableExtra, {
        transform: coerceNullableObject,
    });

    public valuesExtra = input<TableValueExtraInternal, TableValueExtraInternal | null>(
        {},
        {
            transform: coerceNullableObject,
        },
    );

    public rowIndex = input<number | undefined>(undefined);

    public highlighterId = input<string | undefined>(undefined);

    public tableRow = input<TableRow, TableRow | null>(
        {},
        {
            transform: coerceNullableObject,
        },
    );

    public trackByRow = input<TrackByFn, TrackByFn | null>(defaultTrackBy, {
        transform: transformTrackBy,
    });

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

    public rowId = computed(() => {
        const tableRow = this.tableRow();
        const idKey = this.tableExtra().idKey;

        return tableRow[idKey] as string;
    });

    @shouldCall(checkScrollPosition)
    public onRowScroll(event: Event): void {
        this.updateScrollBottomSubject(true);
    }

    public updateScrollBottomSubject(value: boolean): void {
        this.scrollBottomSubject$.next(value);
    }

    public onRowClick(): void {
        const rowId: string = this.rowId();
        const item = this.valuesExtra()[rowId];

        if (!item.disabled) {
            const isExpanded = item.isExpanded;

            isExpanded ? this.service.collapseRowById(rowId) : this.service.expandRowById(rowId);
        }
    }

    public onArrowClick(event: Event): void {
        event.stopPropagation();

        const id = this.getChildRowId(this.tableRow());
        const isOpened = this.valuesExtra()[id].opened;

        if (isOpened) {
            this.service.closeRowById(id);

            return;
        }

        this.service.openRowById(id);
    }

    public trackByFieldKey(_: number, metaItem: TableMeta): string {
        return metaItem.fieldKey;
    }

    public onSelectRow(id: string): void {
        this.service.processRowSelectingById(id);
    }

    private getChildRowId(child: TableRow): string {
        return child[this.tableExtra().idKey] as string;
    }
}
