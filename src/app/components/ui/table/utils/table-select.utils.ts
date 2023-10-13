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

export function selectParentRowById(selectedRows: unknown[], id: string, tableExtra: TableExtra, valueExtra: TableValueExtraInternal): unknown[] {
    const item = valueExtra[id];

    let updatedSelectedRows = [...selectedRows];

    const itemExist = updatedSelectedRows.find(selectedRow => `${selectedRow}` === `${id}`);

    if (!itemExist) {
        updatedSelectedRows = [...selectedRows, id];
    }

    if (item.hasChild) {
        (item.children ?? []).forEach(child => {
            updatedSelectedRows = selectParentRowById(updatedSelectedRows, child[tableExtra.idKey] as string, tableExtra, valueExtra);
        });

        return updatedSelectedRows;
    } else {
        return updatedSelectedRows;
    }
}

export function deselectParentRowById(selectedRows: unknown[], id: string, tableExtra: TableExtra, valueExtra: TableValueExtraInternal): unknown[] {
    const item = valueExtra[id];
    let updatedSelectedRows = selectedRows.filter(selectedRow => `${selectedRow}` !== `${id}`);

    if (item.hasChild) {
        (item.children ?? []).forEach(child => {
            updatedSelectedRows = deselectParentRowById(updatedSelectedRows, child[tableExtra.idKey] as string, tableExtra, valueExtra);
        });

        return updatedSelectedRows;
    } else {
        return updatedSelectedRows;
    }
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
