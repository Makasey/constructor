import { AsyncPipe, NgTemplateOutlet } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  TemplateRef,
  ViewEncapsulation,
  computed,
  input,
  untracked,
  output,
  OnInit,
} from "@angular/core";

import { BehaviorSubject, Observable, debounceTime, filter, tap } from "rxjs";
import { CdkDragDrop, DragDropModule } from "@angular/cdk/drag-drop";

import {
    AbstractAwesomeTableService,
    ColumnDropEvent,
    DEFAULT_LOAD_MORE_LABEL,
    LZTableBodyComponent,
    LZTableFootComponent,
    LZTableHeadComponent,
    TableExtra,
    TableMeta,
    TableRow,
    TableValueExtraInternal,
    TemplateMap,
    checkScrollPosition,
    defaultTableExtra,
    provideTableStore,
} from "@components";
import { shouldCall } from "@shared-decorators";

import { LZLoaderComponent } from "../loader";
import { TrackByFn } from "./interfaces";
import { coerceBoolean, coerceNullableArray, coerceNullableObject, transformTrackBy } from "./transformers/table.transformers";
import { defaultTrackBy } from "./constants";

@Component({
    selector: "lz-table",
    templateUrl: "./table.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [LZTableBodyComponent, LZLoaderComponent, LZTableHeadComponent, LZTableFootComponent, AsyncPipe, NgTemplateOutlet, DragDropModule],
    providers: [...provideTableStore()],
})
export class LZTableComponent implements OnInit{
    public templatesMap = input<TemplateMap>({});

    public loadMoreLabel = input<string>(DEFAULT_LOAD_MORE_LABEL);

    public footerTemplate = input<TemplateRef<unknown> | undefined>(undefined);

    public relations = input<Record<string, unknown[]>>({});

    public readonly onBottomScrolled = output<boolean>();

    public readonly onSelect = output<unknown[]>();

    public readonly columnDropped = output<ColumnDropEvent>();

    public _tableExtra: TableExtra = { ...defaultTableExtra };

    public previousScrollPosition: number;

    public tableRows$: Observable<TableRow[]> = this.service.tableRows$;

    public tableExtra$: Observable<TableExtra> = this.service.tableExtra$;

    public tableMeta$: Observable<TableMeta[]> = this.service.tableMeta$;

    public valuesExtra$: Observable<TableValueExtraInternal> = this.service.valuesExtra$;

    public selectedRows$: Observable<unknown[]> = this.service.selectedRows$.pipe(tap(rows => this.onSelect.emit(rows)));

    public scrollBottomSubject$ = new BehaviorSubject(false);

    public _trackByRow: (index: number, row: unknown) => unknown;

    constructor(private service: AbstractAwesomeTableService) {
        this.scrollBottomSubject$.pipe(
            debounceTime(100),
            filter(isEnd => isEnd),
            tap(isEnd => this.onBottomScrolled.emit(isEnd)),
        );
    }

    public tableMeta = input<TableMeta[], TableMeta[] | null>([], {
        transform: coerceNullableArray,
    });

    public trackByRow = input<TrackByFn, TrackByFn | null>(defaultTrackBy, {
        transform: transformTrackBy,
    });

    public loading = input<boolean, boolean | null>(false, {
        transform: coerceBoolean,
    });

    public tableRows = input<TableRow[], TableRow[] | null>([], {
        transform: coerceNullableArray,
    });

    public selectedRows = input<unknown[], unknown[] | null>([], {
        transform: coerceNullableArray,
    });

    public valuesExtra = input<TableValueExtraInternal, TableValueExtraInternal | null>(
        {},
        {
            transform: coerceNullableObject,
        },
    );

    public calculateValueExtra = computed(() => {
        this.service.calculateTableState(
            {
                selectedRows: untracked(() => new Set(this.selectedRows())),
                tableExtra: this._tableExtra,
                tableMeta: this.tableMeta(),
                tableRows: this.tableRows(),
                valuesExtra: this.valuesExtra(),
            },
            this.relations(),
        );
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

    public deselect(): void {
        this.service.deselectAllRows();
    }

    public dropColumn(event: CdkDragDrop<unknown, unknown>): void {
        const dragEvent = this.service.dropColumn(event);

        if (!dragEvent) {
            return;
        }

        this.columnDropped.emit(dragEvent);
    }
}
