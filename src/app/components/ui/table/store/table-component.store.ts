import { Injectable } from "@angular/core";

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
} from "@components";
import { TableState } from "@core";

@Injectable()
export abstract class AbstractAwesomeTableService {
    public abstract selectTableExtra(): Observable<TableExtra>;

    public abstract selectTableMeta(): Observable<TableMeta[]>;

    public abstract selectTableRows(): Observable<TableRow[]>;

    public abstract selectValuesExtra(): Observable<TableValueExtraInternal>;

    public abstract selectSelectedRows(): Observable<unknown[]>;

    public abstract selectIsDragging(): Observable<boolean>;

    public abstract openRowById(id: string): void;

    public abstract closeRowById(id: string): void;

    public abstract selectAllRows(): void;

    public abstract deselectAllRows(): void;

    public abstract selectRowById(id: string): void;

    public abstract enableRowById(id: string): void;

    public abstract disableRowById(id: string): void;

    public abstract getElementByIndex(itemIndex: number): TableMeta;

    public abstract startDragging(): void;

    public abstract endDragging(): void;

    public abstract expandRowById(id: string): void;

    public abstract collapseRowById(id: string): void;

    public abstract patchState(data: Partial<TableState>): void;

    public abstract resetState(): void;
}

@Injectable()
export class DefaultAwesomeTableService extends AbstractAwesomeTableService {
    constructor(
        protected readonly query: TableQuery,
        protected readonly service: TableService,
    ) {
        super();
    }

    public selectTableExtra(): Observable<TableExtra> {
        return this.query.select(state => state.tableExtra).pipe(shareReplay(1));
    }

    public selectTableMeta(): Observable<TableMeta[]> {
        return this.query.select(state => state.tableMeta).pipe(shareReplay(1));
    }

    public selectTableRows(): Observable<TableRow[]> {
        return this.query.select(state => state.tableRows).pipe(shareReplay(1));
    }

    public selectValuesExtra(): Observable<TableValueExtraInternal> {
        return this.query.select(state => state.valuesExtra).pipe(shareReplay(1));
    }

    public selectSelectedRows(): Observable<unknown[]> {
        return this.query.select(state => state.selectedRows).pipe(shareReplay(1));
    }

    public selectIsDragging(): Observable<boolean> {
        return this.query.select(state => state.isDragging).pipe(shareReplay(1));
    }

    public openRowById(id: string): void {
        const state = this.query.getValue();

        this.patchState({
            valuesExtra: openRowById(id, state.valuesExtra),
        });
    }

    public closeRowById(id: string): void {
        const state = this.query.getValue();

        this.patchState({
            valuesExtra: closeRowById(id, state.valuesExtra),
        });
    }

    public selectAllRows(): void {
        const state = this.query.getValue();
        const updatedValuesExtra = selectAllRows(state.valuesExtra);

        this.patchState({
            tableExtra: {
                ...state.tableExtra,
                selectAll: true,
            },
            selectedRows: Object.keys(updatedValuesExtra),
            valuesExtra: updatedValuesExtra,
        });
    }

    public deselectAllRows(): void {
        const state = this.query.getValue();

        this.patchState({
            tableExtra: {
                ...state.tableExtra,
                selectAll: false,
            },
            selectedRows: [],
            valuesExtra: deselectAllRows(state.valuesExtra),
        });
    }

    public selectRowById(id: string): void {
        const state = this.query.getValue();
        const { selectedRows, tableExtra, valuesExtra } = state;
        const item = valuesExtra[id];

        if (item.selected) {
            const updatedSelectedRows = deselectParentRowById(selectedRows, id, tableExtra, valuesExtra);

            this.patchState({
                valuesExtra: deselectRowById(id, tableExtra, valuesExtra),
                selectedRows: updatedSelectedRows,
                tableExtra: {
                    ...tableExtra,
                    selectAll: updatedSelectedRows.length === Object.keys(valuesExtra).length,
                },
            });
        } else {
            const updatedSelectedRows = selectParentRowById(state.selectedRows, id, state.tableExtra, state.valuesExtra);

            this.patchState({
                valuesExtra: selectRowById(id, tableExtra, valuesExtra),
                selectedRows: updatedSelectedRows,
                tableExtra: {
                    ...tableExtra,
                    selectAll: updatedSelectedRows.length === Object.keys(valuesExtra).length,
                },
            });
        }
    }

    public enableRowById(id: string): void {
        const state = this.query.getValue();

        this.patchState({
            valuesExtra: enableRowById(id, state.valuesExtra),
        });
    }

    public disableRowById(id: string): void {
        const state = this.query.getValue();

        this.patchState({
            valuesExtra: disableRowById(id, state.valuesExtra),
        });
    }

    public expandRowById(id: string): void {
        const state = this.query.getValue();

        this.patchState({
            valuesExtra: expandRowById(id, state.valuesExtra),
        });
    }

    public collapseRowById(id: string): void {
        const state = this.query.getValue();

        this.patchState({
            valuesExtra: collapseRowById(id, state.valuesExtra),
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
            return structuredClone(data);
        });
    }

    public resetState(): void {
        this.patchState(structuredClone(initialTableStore));
    }
}
