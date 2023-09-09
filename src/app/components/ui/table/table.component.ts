import {
    AbstractAwesomeTableService,
    ColumnDropEvent,
    DEFAULT_LOAD_MORE_LABEL,
    DefaultAwesomeTableService,
    TableExtra,
    TableMeta,
    TableQuery,
    TableRow,
    TableService,
    TableStateUpdateModel,
    TableStore,
    TableValueExtraInternal,
    TemplateMap,
    checkScrollPosition,
    convertPlainRowsToValueExtraParams,
} from "@components/ui";
import { BehaviorSubject, Observable, debounceTime, filter, skip, tap } from "rxjs";
import { CdkDragDrop } from "@angular/cdk/drag-drop";
import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges,
    TemplateRef,
    ViewEncapsulation,
} from "@angular/core";
import { defaultTableExtra } from "@components/ui/table/constants";
import { shouldCall } from "../../../decorators/should-call";

@Component({
    selector: "lz-table",
    templateUrl: "./table.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [
        TableStore,
        TableQuery,
        TableService,
        {
            provide: AbstractAwesomeTableService,
            useClass: DefaultAwesomeTableService,
        },
    ],
})
export class TableComponent implements OnInit, OnChanges, OnDestroy {
    @Input()
    public templatesMap: TemplateMap = {};

    @Input()
    public loadMoreLabel = DEFAULT_LOAD_MORE_LABEL;

    @Input()
    public footerTemplate: TemplateRef<unknown>;

    @Input()
    public height = 400;

    @Input()
    public relations: Record<string, unknown[]> = {};

    @Output()
    public onBottomScrolled: Observable<boolean>;

    @Output()
    public onSelect: EventEmitter<unknown[]> = new EventEmitter<unknown[]>();

    @Output()
    public columnDropped: EventEmitter<ColumnDropEvent> = new EventEmitter<ColumnDropEvent>();

    public _tableExtra: TableExtra = { ...defaultTableExtra };

    public _selectedRows: unknown[] = [];

    public _loading: boolean;

    public _tableRows: TableRow[] = [];

    public _tableMeta: TableMeta[] = [];

    public previousScrollPosition: number;

    public _valuesExtra: TableValueExtraInternal = {};

    public tableRows$: Observable<TableRow[]> = this.service.selectTableRows();

    public tableExtra$: Observable<TableExtra> = this.service.selectTableExtra();

    public tableMeta$: Observable<TableMeta[]> = this.service.selectTableMeta();

    public valuesExtra$: Observable<TableValueExtraInternal> = this.service.selectValuesExtra();

    public selectedRows$: Observable<unknown[]> = this.service.selectSelectedRows().pipe(
        skip(1),
        tap(rows => this.onSelect.emit(rows)),
    );

    public scrollBottomSubject$ = new BehaviorSubject(false);

    public _trackByRow: (index: number, row: unknown) => unknown;

    constructor(private service: AbstractAwesomeTableService) {
        this.onBottomScrolled = this.scrollBottomSubject$.pipe(
            debounceTime(100),
            filter(isEnd => isEnd),
        );
    }

    @Input()
    public set tableMeta(tableMeta: TableMeta[] | null) {
        this._tableMeta = tableMeta ?? [];
    }

    @Input()
    public set trackByRow(trackByRow: (index: number, item: unknown) => unknown) {
        if (trackByRow) {
            this._trackByRow = trackByRow;
        }
    }

    @Input()
    public set loading(loading: boolean) {
        this._loading = loading ?? false;
    }

    @Input({ required: true })
    public set tableRows(tableRows: TableRow[] | null) {
        this._tableRows = tableRows ?? [];
    }

    @Input()
    public set selectedRows(selectedRows: unknown[]) {
        this._selectedRows = Array.isArray(selectedRows) ? [...selectedRows] : [];
    }

    @Input({ required: true })
    public set tableExtra(tableExtra: Partial<TableExtra> | null) {
        const processedTableExtra = tableExtra ?? {};

        this._tableExtra = { ...this._tableExtra, ...processedTableExtra };
    }

    @Input()
    public set valuesExtra(valuesExtra: TableValueExtraInternal | null) {
        this._valuesExtra = valuesExtra ?? {};
    }

    @shouldCall(checkScrollPosition)
    public onScroll(_: Event): void {
        this.scrollBottomSubject$.next(true);
    }

    public ngOnInit(): void {
        this.trackByRow = (_: number, row: unknown): unknown => (row as TableRow)[this._tableExtra.idKey];
    }

    public ngOnDestroy(): void {
        this.service.resetState();
    }

    public updateComponentStore(state: TableStateUpdateModel, relations: Record<string, unknown[]>): void {
        const { tableRows, tableMeta, tableExtra, valuesExtra, selectedRows } = state;

        const { tableRows: processedTableRows, valuesExtra: processedValuesExtra } = convertPlainRowsToValueExtraParams(
            tableRows,
            relations,
            tableExtra,
            valuesExtra,
            selectedRows,
        );

        this.service.patchState({
            tableExtra: tableExtra,
            tableRows: processedTableRows,
            tableMeta: tableMeta,
            valuesExtra: processedValuesExtra,
        });
    }

    public deselect(): void {
        this.service.deselectAllRows();
    }

    public dropColumn(event: CdkDragDrop<unknown, unknown>): void {
        const { currentIndex, previousIndex } = event;

        if (currentIndex === previousIndex) {
            return;
        }

        this.columnDropped.emit({
            previousIndex: previousIndex,
            currentIndex: currentIndex,
        });
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if ((changes.tableMeta && !changes.tableMeta.firstChange) || (changes.tableRows && !changes.tableRows.firstChange)) {
            this.updateComponentStore(
                {
                    tableRows: this._tableRows,
                    valuesExtra: this._valuesExtra,
                    tableMeta: this._tableMeta,
                    tableExtra: this._tableExtra,
                    selectedRows: this._selectedRows,
                },
                this.relations,
            );
        }
    }
}
