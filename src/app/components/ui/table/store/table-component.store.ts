import { Injectable } from "@angular/core";
import { CdkDragDrop } from "@angular/cdk/drag-drop";

import { Observable, shareReplay } from "rxjs";

import {
    TableExtra,
    TableMeta,
    TableQuery,
    TableRow,
    TableService,
    TableValueExtraInternal,
    closeRowById,
    collapseRowById,
    deselectAllRows,
    deselectParentRowById,
    deselectRowById,
    disableRowById,
    enableRowById,
    expandRowById,
    initialTableStore,
    openRowById,
    selectAllRows,
    selectParentRowById,
    selectRowById,
    ColumnDropEvent,
    TableStateUpdateModel,
    convertPlainRowsToValueExtraParams,
} from "@components";
import { TableState, UIDataState } from "@core";
import { TableValueExtraInternalParams } from "../interfaces";
import { convertSelectedRows } from "../utils";

@Injectable()
export abstract class AbstractAwesomeTableService {
    public abstract tableExtra$: Observable<TableExtra>;

    public abstract tableMeta$: Observable<TableMeta[]>;

    public abstract tableRows$: Observable<TableRow[]>;

    public abstract valuesExtra$: Observable<TableValueExtraInternal>;

    public abstract selectedRows$: Observable<unknown[]>;

    public abstract isDragging$: Observable<boolean>;

    public abstract openRowById(id: string): void;

    public abstract closeRowById(id: string): void;

    public abstract selectAllRows(): void;

    public abstract deselectAllRows(): void;

    public abstract processRowSelectingById(id: string): void;

    public abstract enableRowById(id: string): void;

    public abstract disableRowById(id: string): void;

    public abstract getElementByIndex(itemIndex: number): TableMeta;

    public abstract startDragging(): void;

    public abstract endDragging(): void;

    public abstract expandRowById(id: string): void;

    public abstract collapseRowById(id: string): void;

    public abstract patchState(data: Partial<TableState>): void;

    public abstract resetState(): void;

    public abstract dropColumn(event: CdkDragDrop<unknown, unknown>): ColumnDropEvent | undefined;

    public abstract calculateTableState(state: TableStateUpdateModel, relations: Record<string, unknown[]>): void;

    public abstract calculateSelectedRows(selectedRows: unknown[]): void;
}

@Injectable()
export class DefaultAwesomeTableService extends AbstractAwesomeTableService {
    constructor(
        protected readonly query: TableQuery,
        protected readonly service: TableService,
    ) {
        super();
    }
    
    public tableExtra$: Observable<TableExtra> = this.query.select(state => state.tableExtra).pipe(shareReplay(1));

    public tableMeta$: Observable<TableMeta[]> = this.query.select(state => state.tableMeta).pipe(shareReplay(1));

    public tableRows$: Observable<TableRow[]> = this.query.select(state => state.tableRows).pipe(shareReplay(1));

    public valuesExtra$: Observable<TableValueExtraInternal> = this.query.select(state => state.valuesExtra).pipe(shareReplay(1));

    public selectedRows$: Observable<unknown[]> = this.query.select(state => state.selectedRows).pipe(shareReplay(1));

    public isDragging$: Observable<boolean> =  this.query.select(state => state.isDragging).pipe(shareReplay(1));

    public openRowById(id: string): void {
        const { valuesExtra } = this.query.getValue();

        this.patchState({
            valuesExtra: openRowById(id, valuesExtra),
        });
    }

    public closeRowById(id: string): void {
        const { valuesExtra } = this.query.getValue();

        this.patchState({
            valuesExtra: closeRowById(id, valuesExtra),
        });
    }

    public selectAllRows(): void {
        const { valuesExtra, tableExtra } = this.query.getValue();
        const updatedValuesExtra = selectAllRows(valuesExtra);

        this.patchState({
            tableExtra: {
                ...tableExtra,
                selectAll: true,
            },
            selectedRows: convertSelectedRows(Object.keys(updatedValuesExtra)),
            valuesExtra: updatedValuesExtra,
        });
    }

    public deselectAllRows(): void {
        const { tableExtra, valuesExtra } = this.query.getValue();

        this.patchState({
            tableExtra: {
                ...tableExtra,
                selectAll: false,
            },
            selectedRows: new Set(),
            valuesExtra: deselectAllRows(valuesExtra),
        });
    }

    public processRowSelectingById(id: string): void {
        const { selectedRows } = this.query.getValue();
        const isSelected = selectedRows.has(id);

        if(isSelected) {
            this.deselectRowById(id)
            
            return;
        }

        this.selectRowById(id);
    }

    public selectRowById(id: string): void {
        const { valuesExtra, tableExtra, selectedRows } = this.query.getValue();

        const updatedSelectedRows = selectParentRowById(selectedRows, id, tableExtra, valuesExtra);

            this.patchState({
                valuesExtra: selectRowById(id, tableExtra, valuesExtra),
                selectedRows: updatedSelectedRows,
                tableExtra: {
                    ...tableExtra,
                    selectAll: updatedSelectedRows.size === Object.keys(valuesExtra).length,
                },
            });
    }

    public deselectRowById(id: string): void {
        const { valuesExtra, tableExtra, selectedRows } = this.query.getValue();

        const updatedSelectedRows = deselectParentRowById(selectedRows, id, tableExtra, valuesExtra);

        this.patchState({
                valuesExtra: deselectRowById(id, tableExtra, valuesExtra),
                selectedRows: updatedSelectedRows,
                tableExtra: {
                    ...tableExtra,
                    selectAll: updatedSelectedRows.size === Object.keys(valuesExtra).length,
                },
        });
    }

    public enableRowById(id: string): void {
        const { valuesExtra } = this.query.getValue();

        this.patchState({
            valuesExtra: enableRowById(id, valuesExtra),
        });
    }

    public disableRowById(id: string): void {
        const { valuesExtra } = this.query.getValue();

        this.patchState({
            valuesExtra: disableRowById(id, valuesExtra),
        });
    }

    public expandRowById(id: string): void {
        const { valuesExtra } = this.query.getValue();

        this.patchState({
            valuesExtra: expandRowById(id, valuesExtra),
        });
    }

    public collapseRowById(id: string): void {
        const { valuesExtra } = this.query.getValue();

        this.patchState({
            valuesExtra: collapseRowById(id, valuesExtra),
        });
    }

    public startDragging(): void {
        this.patchState({
            isDragging: true,
        });
    }

    public endDragging(): void {
        this.patchState({
            isDragging: false,
        });
    }

    public getElementByIndex(itemIndex: number): TableMeta {
        const tableMeta = this.query.getValue().tableMeta;

        return tableMeta.find((_, index) => itemIndex === index)!;
    }

    public patchState(data: Partial<TableState>): void {
        this.service.updateState(() => {
            return {
                ...data,
            }
        });
    }

    public resetState(): void {
        this.patchState(structuredClone(initialTableStore));
    }

    public dropColumn(event: CdkDragDrop<unknown, unknown>): ColumnDropEvent | undefined {
        const { currentIndex, previousIndex } = event;

        if (currentIndex === previousIndex) {
            return;
        }

        return {
            currentIndex: currentIndex,
            previousIndex: previousIndex,
        }
    }

    public calculateTableState(state: TableStateUpdateModel, relations: Record<string, unknown[]>): void {
        const { tableRows, tableMeta, tableExtra, valuesExtra, selectedRows } = state;

        const { tableRows: processedTableRows, valuesExtra: processedValuesExtra } = convertPlainRowsToValueExtraParams(
            tableRows,
            relations,
            tableExtra,
            valuesExtra,
            selectedRows,
        );

        this.patchState({
            tableExtra: tableExtra,
            tableRows: processedTableRows,
            tableMeta: tableMeta,
            valuesExtra: processedValuesExtra,
        });
    }

    public calculateSelectedRows(selectedRows: unknown[]): void {
        const updatedSelectedRows = convertSelectedRows(selectedRows);

        this.patchState({
            selectedRows: updatedSelectedRows,
        })
    }
}
