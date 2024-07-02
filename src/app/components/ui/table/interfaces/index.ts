import { TableState } from "@core";

import { TemplateRef } from "@angular/core";

export type TableMeta<T = unknown> = Readonly<{
    label: string;
    fieldKey: string;
    templateKey?: string;
    customClass?: string;
    width?: number;
    headerTemplateKey?: string;
    customData?: T;
    dragDisabled?: boolean;
}>;

export type TableRow = Readonly<{
    [key: string]: unknown;
}>;

export type TableStateUpdateModel = Readonly<Pick<TableState, "tableMeta" | "tableRows" | "tableExtra" | "valuesExtra" | "selectedRows">>;

export type TemplateMap = Readonly<Record<string, TemplateRef<unknown>>>;

export enum RowPaddingType {
    ARROW_LINE = "arrowLine",
    CELL = "cell",
}

export type TableValueExtra = Readonly<{
    [id: string]: TableValueExtraParams;
}>;

export type TableValueExtraParams = Readonly<{
    parentId?: string;
    selected?: boolean;
    levelToShow?: number;
    rowCustomClass?: string;
    disabled?: boolean;
    checkboxDisabled?: boolean;
    opened?: boolean;
    hasNextPage?: boolean;
    pageLoading?: boolean;
    hasChild?: boolean;
    rowSubTemplateKey?: string;
    customData?: unknown;
    scrollable?: boolean;
    isExpanded: boolean;
    expandTemplateKey?: string;
}>;

export type TableValueExtraInternal = Readonly<{
    [id: string]: TableValueExtraInternalParams;
}>;

export type TableValueExtraInternalParams = TableValueExtraParams &
    Readonly<{
        index?: number;
        children?: TableRow[];
        parents?: TableRow[];
        level?: number;
        childrenLength?: number;
    }>;

export type TableExtra = Readonly<{
    hasCheckboxes: boolean;
    pageLoading: boolean;
    noRecordsLabel: string;
    hasSelectAllCheckbox: boolean;
    selectAll: boolean;
    idKey: string;
    nameKey: string;
    isHierarchical: boolean;
    clickableRows: boolean;
    hoverableRows: boolean;
    highlightedId: string | null;
    draggableHeader: boolean;
}>;

export type TableComponentStateModel = Readonly<{
    tableMeta: TableMeta[];
    tableRows: TableRow[];
    tableExtra: TableExtra;
    valuesExtra: TableValueExtraInternal;
    selectedRows: unknown[];
    isDragging: boolean;
}>;

export type ColumnDropEvent = Readonly<{
    previousIndex: number;
    currentIndex: number;
}>;

export type TrackByFn<T = unknown> = (index: number, item: T) => unknown;

export type TransformFn<T> = (value: T | null) => T;
