import { TableExtra, TableRow, TableValueExtraInternal, TableValueExtraInternalParams } from "@components";

export function openRowById(id: string, valuesExtra: TableValueExtraInternal): TableValueExtraInternal {
    return {
        ...valuesExtra,
        [id]: {
            ...valuesExtra[id],
            opened: true,
        },
    };
}

export function closeRowById(id: string, valuesExtra: TableValueExtraInternal): TableValueExtraInternal {
    return {
        ...valuesExtra,
        [id]: {
            ...valuesExtra[id],
            opened: false,
        },
    };
}

export function expandRowById(id: string, valuesExtra: TableValueExtraInternal): TableValueExtraInternal {
    return {
        ...valuesExtra,
        [id]: {
            ...valuesExtra[id],
            isExpanded: true,
        },
    };
}

export function collapseRowById(id: string, valuesExtra: TableValueExtraInternal): TableValueExtraInternal {
    return {
        ...valuesExtra,
        [id]: {
            ...valuesExtra[id],
            isExpanded: false,
        },
    };
}

export function addItemToParent(id: string, valuesExtra: TableValueExtraInternal, items: TableRow | TableRow[]): TableValueExtraInternal {
    const convertedItems = Array.isArray(items) ? items : [items];
    const parent = valuesExtra[id];
    let updatedParent: TableValueExtraInternalParams = {} as TableValueExtraInternalParams;

    if (parent) {
        updatedParent = {
            ...parent,
            hasChild: true,
            children: [...(parent.children ?? []), ...convertedItems],
        };
    }

    return {
        ...valuesExtra,
        [id]: {
            ...valuesExtra[id],
            ...updatedParent,
        },
    };
}

export function removeItemFromParent({
    id,
    valuesExtra,
    tableExtra,
    parentId,
}: {
    id: string;
    valuesExtra: TableValueExtraInternal;
    tableExtra: TableExtra;
    parentId: string;
}): TableValueExtraInternal {
    const parent = valuesExtra[parentId];

    return {
        ...valuesExtra,
        [parentId]: {
            ...parent,
            children: (parent.children ?? []).filter(child => child[tableExtra.idKey] !== id),
        },
    };
}

export function disableRowById(id: string, valuesExtra: TableValueExtraInternal): TableValueExtraInternal {
    return {
        ...valuesExtra,
        [id]: {
            ...valuesExtra[id],
            disabled: true,
        },
    };
}

export function enableRowById(id: string, valuesExtra: TableValueExtraInternal): TableValueExtraInternal {
    return {
        ...valuesExtra,
        [id]: {
            ...valuesExtra[id],
            disabled: false,
        },
    };
}

export function convertSelectedRows(selectedRows: unknown[]): Set<unknown> {
    return new Set(selectedRows);
}