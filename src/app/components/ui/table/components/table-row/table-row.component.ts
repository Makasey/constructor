import { ChangeDetectionStrategy, Component, HostBinding, Output, ViewEncapsulation, input, WritableSignal } from "@angular/core";
import { AsyncPipe, NgTemplateOutlet, NgClass, NgStyle } from "@angular/common";
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
import { shouldCall } from "@shared-decorators";
import { LZInitVarDirective } from "@shared-directives/init-var";

import { coerceNullableArray, coerceNullableObject, transformTrackBy } from "../../transformers";
import { defaultTrackBy } from "../../constants";
import { LZRowPaddingPipe } from "../../pipes";
import { TrackByFn } from "../../interfaces";

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

    public templatesMap: WritableSignal<TemplateMap> = input<TemplateMap>({});

    public tableMeta: WritableSignal<TableMeta[]> = input<TableMeta[]>([], {
        transform: coerceNullableArray
    });

    public tableExtra: WritableSignal<TableExtra> = input<TableExtra>({} as TableExtra, {
        transform: coerceNullableObject,
    });

    public valuesExtra: WritableSignal<TableValueExtraInternal> = input<TableValueExtraInternal>({}, {
        transform: coerceNullableObject,
    });

    public rowIndex: WritableSignal<number | undefined> = input<number | undefined>(undefined);

    public highlighterId: WritableSignal<string | undefined> = input<string | undefined>(undefined);

    public tableRow: WritableSignal<TableRow> = input<TableRow>({}, {
        transform: coerceNullableObject,
    });

    public trackByRow = input<TrackByFn>(defaultTrackBy, {
        transform: transformTrackBy,
    })

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

    public onRowClick(): void {
        const rowId: string = this.rowId as string;
        const item = this.valuesExtra[rowId];

        if (!item.disabled) {
            const isExpanded = item.isExpanded;

            isExpanded ? this.service.collapseRowById(rowId) : this.service.expandRowById(rowId);
        }
    }

    public onArrowClick(event: Event): void {
        event.stopPropagation();

        const id = this.getChildRowId(this.tableRow());
        const isOpened = this.valuesExtra[id].opened;

        if(isOpened) {
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
        return child[this.tableExtra.idKey] as string;
    }
}
