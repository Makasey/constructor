import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    TemplateRef,
    ViewEncapsulation,
    input,
    WritableSignal,
    computed,
    untracked,
} from "@angular/core";
import { AsyncPipe, NgTemplateOutlet } from "@angular/common";

import { BehaviorSubject, Observable, debounceTime, filter, tap } from "rxjs";
import { CdkDragDrop, DragDropModule } from "@angular/cdk/drag-drop";

import {
    AbstractAwesomeTableService,
    ColumnDropEvent,
    DEFAULT_LOAD_MORE_LABEL,
    TableExtra,
    TableMeta,
    TableRow,
    TableValueExtraInternal,
    TemplateMap,
    checkScrollPosition,
    defaultTableExtra,
    provideTableStore,
    LZLoaderComponent,
    LZTableBodyComponent,
    LZTableHeadComponent,
} from "@components";
import { shouldCall } from "@shared-decorators";

import { coerceBoolean, coerceNullableArray, coerceNullableObject, transformTrackBy } from "./transformers/table.transformers";
import { defaultTrackBy } from "./constants";
import { TrackByFn } from "./interfaces";

@Component({
    selector: "lz-table",
    templateUrl: "./table.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [LZTableBodyComponent, LZLoaderComponent, LZTableHeadComponent, AsyncPipe, NgTemplateOutlet, DragDropModule],
    providers: [
        ...provideTableStore(),
    ],
})
export class LZTableComponent implements OnInit {
    public templatesMap: WritableSignal<TemplateMap> = input<TemplateMap>({});

    public loadMoreLabel: WritableSignal<string> = input<string>(DEFAULT_LOAD_MORE_LABEL);

    public footerTemplate: WritableSignal<TemplateRef<unknown> | undefined> = input<TemplateRef<unknown> | undefined>(undefined);

    public relations: WritableSignal<Record<string, unknown[]>> = input<Record<string, unknown[]>>({});

    @Output()
    public onBottomScrolled: Observable<boolean>;

    @Output()
    public onSelect: EventEmitter<unknown[]> = new EventEmitter<unknown[]>();

    @Output()
    public columnDropped: EventEmitter<ColumnDropEvent> = new EventEmitter<ColumnDropEvent>();

    public _tableExtra: TableExtra = { ...defaultTableExtra };

    public previousScrollPosition: number;

    public tableRows$: Observable<TableRow[]> = this.service.tableRows$;

    public tableExtra$: Observable<TableExtra> = this.service.tableExtra$;

    public tableMeta$: Observable<TableMeta[]> = this.service.tableMeta$;

    public valuesExtra$: Observable<TableValueExtraInternal> = this.service.valuesExtra$;

    public selectedRows$: Observable<unknown[]> = this.service.selectedRows$.pipe(
      
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

    public tableMeta = input.required<TableMeta[]>([], {
        transform: coerceNullableArray,
    });

    public trackByRow  = input<TrackByFn>(defaultTrackBy, {
        transform: transformTrackBy,
    });

    public loading = input<boolean>(false, {
        transform: coerceBoolean,
    })

    public tableRows = input.required<TableRow[]>([], {
        transform: coerceNullableArray
    });

    public selectedRows: WritableSignal<unknown[]> = input([], {
        transform: coerceNullableArray,
    })

    public valuesExtra = input<TableValueExtraInternal>({}, {
        transform: coerceNullableObject,
    })

    public calculateValueExtra = computed(() => {
        this.service.calculateTableState({
            selectedRows: untracked(() => this.selectedRows()),
            tableExtra: this._tableExtra,
            tableMeta: this.tableMeta(),
            tableRows: this.tableRows(),
            valuesExtra: this.valuesExtra(),
        }, this.relations())
    });

    public calculateSelectedRows = computed(() => {
        this.service.calculateSelectedRows(this.selectedRows());
    });

    @Input({ required: true })
    public set tableExtra(tableExtra: Partial<TableExtra> | null) {
        const processedTableExtra = tableExtra ?? {};

        this._tableExtra = { ...this._tableExtra, ...processedTableExtra };
    }


    @shouldCall(checkScrollPosition)
    public onScroll(_: Event): void {
        this.scrollBottomSubject$.next(true);
    }

    public ngOnInit(): void {
        if(!this.trackByRow()) {
            this.trackByRow.set((_: number, row: unknown): unknown => (row as TableRow)[this._tableExtra.idKey]);
        }
    }

    public deselect(): void {
        this.service.deselectAllRows();
    }

    public dropColumn(event: CdkDragDrop<unknown, unknown>): void {
        const dragEvent = this.service.dropColumn(event);

        if(!dragEvent) {
            return;
        }

        this.columnDropped.emit(dragEvent);
    }
}
