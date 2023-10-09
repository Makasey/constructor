import { ColumnStructure, InnerPageElement, StyleUnit, columnStructureCountMap } from "@modules/constructor";
import { defaultInnerElementSettings } from "@modules/constructor/constants";

function getInnerItemByType(type: ColumnStructure, parentId: number, lastElementId: number): InnerPageElement {
    const count = columnStructureCountMap[type];

    const elementWidth = Math.floor(100 / count);

    return {
        ...defaultInnerElementSettings,
        id: lastElementId + 1,
        parentId: parentId,
        children: [],
        isExtendable: false,
        settings: {
            ...defaultInnerElementSettings.settings,
            width: { value: elementWidth - 1, unit: StyleUnit.PERCENT },
        },
    };
}

export function processStructureType(type: ColumnStructure, parentId: number, lastElementId: number): InnerPageElement[] {
    const count = columnStructureCountMap[type];

    const result = [];

    for (let i = 0; i < count; i++) {
        const item = getInnerItemByType(type, parentId, lastElementId);

        result.push(item);
    }

    return result;
}
