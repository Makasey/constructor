import { DEFAULT_VALUE_EXTRA_ITEM, TableExtra, TableRow, TableValueExtraInternal } from "@components";

export function convertPlainRowsToValueExtraParams(
    plainRows: TableRow[],
    relations: Record<string, unknown[]>,
    tableExtra: TableExtra,
    valuesExtra: TableValueExtraInternal,
    selectedRows: unknown[],
): { tableRows: TableRow[]; valuesExtra: TableValueExtraInternal } {
    let valueExtra: TableValueExtraInternal = {} as TableValueExtraInternal;
    const processedRows: TableRow[] = [];

    plainRows.forEach(plainRow => {
        const id = plainRow[tableExtra.idKey] as string;
        const isParent = !!relations[id];
        const parentId = Object.entries(relations).reduce<string | undefined>((prev, [key, value]) => {
            if (prev) {
                return prev;
            }

            const isChild = value.includes(id);

            prev = isChild ? key : undefined;

            return prev;
        }, "");

        const children: TableRow[] | undefined = isParent ? [] : undefined;

        !parentId && processedRows.push(plainRow);

        if (parentId) {
            const parent = valueExtra[parentId];
            const parentChildren = parent?.children ?? [];

            valueExtra = {
                ...valueExtra,
                [parentId]: {
                    ...parent,
                    children: [...parentChildren, plainRow],
                },
            };
        }

        valueExtra = {
            ...valueExtra,
            [id]: {
                ...DEFAULT_VALUE_EXTRA_ITEM,
                ...valueExtra[id],
                ...{
                    hasChild: isParent,
                    children: children,
                    parentId: parentId,
                    level: 1 + +(parentId ?? 0) ? 1 : 0,
                    selected: selectedRows.includes(id),
                },
                ...(valuesExtra[id] ?? {}),
            },
        };
    });

    return { valuesExtra: valueExtra, tableRows: processedRows };
}
