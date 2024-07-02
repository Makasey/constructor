import { TableExtra, TableValueExtraInternal } from "@components";

export function selectRowById(id: string, tableExtra: Partial<TableExtra>, valuesExtra: TableValueExtraInternal): TableValueExtraInternal {
    const item = valuesExtra[id];
    let updatedValuesExtra = { ...valuesExtra };

    if (item.hasChild) {
        (item.children ?? []).forEach(child => {
            updatedValuesExtra = selectRowById(`${child[tableExtra.idKey!]}`, tableExtra, updatedValuesExtra);
        });
    }

    return {
        ...updatedValuesExtra,
        [id]: {
            ...item,
            selected: true,
        },
    };
}

export function deselectRowById(id: string, tableExtra: Partial<TableExtra>, valuesExtra: TableValueExtraInternal): TableValueExtraInternal {
    const item = valuesExtra[id];
    let updatedValuesExtra = { ...valuesExtra };

    if (item.hasChild) {
        (item.children ?? []).forEach(child => {
            updatedValuesExtra = deselectRowById(`${child[tableExtra.idKey!]}`, tableExtra, updatedValuesExtra);
        });
    }

    return {
        ...updatedValuesExtra,
        [id]: {
            ...item,
            selected: false,
        },
    };
}

export function selectParentRowById(
    selectedRows: Set<unknown>,
    id: string,
    tableExtra: TableExtra,
    valueExtra: TableValueExtraInternal,
): Set<unknown> {
    const item = valueExtra[id];

    const itemExist = selectedRows.has(id);

    if (!itemExist) {
        selectedRows.add(id);
    }

    if (item.hasChild) {
        (item.children ?? []).forEach(child => {
            selectParentRowById(selectedRows, child[tableExtra.idKey] as string, tableExtra, valueExtra);
        });
    }

    return selectedRows;
}

export function deselectParentRowById(
    selectedRows: Set<unknown>,
    id: string,
    tableExtra: TableExtra,
    valueExtra: TableValueExtraInternal,
): Set<unknown> {
    const item = valueExtra[id];

    selectedRows.delete(id);

    if (item.hasChild) {
        (item.children ?? []).forEach(child => {
            deselectParentRowById(selectedRows, child[tableExtra.idKey] as string, tableExtra, valueExtra);
        });
    }

    return selectedRows;
}

export function selectAllRows(valuesExtra: TableValueExtraInternal): TableValueExtraInternal {
    return Object.entries(valuesExtra).reduce((accumulator, [key, value]) => {
        return {
            ...accumulator,
            [key]: {
                ...accumulator[key],
                ...value,
                selected: true,
            },
        };
    }, {});
}

export function deselectAllRows(valuesExtra: TableValueExtraInternal): TableValueExtraInternal {
    return Object.entries(valuesExtra).reduce((accumulator, [key, value]) => {
        return {
            ...accumulator,
            [key]: {
                ...accumulator[key],
                ...value,
                selected: false,
            },
        };
    }, {});
}
