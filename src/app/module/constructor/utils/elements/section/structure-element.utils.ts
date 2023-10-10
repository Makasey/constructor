import { ColumnStructure, InnerPageElement, StyleUnit, columnStructureCountMap } from "@modules/constructor";
import { defaultInnerElementSettings } from "@modules/constructor/constants";
import { getRandomId } from "@shared-utils";

function getInnerItemByType(type: ColumnStructure, parentId: string): InnerPageElement {
    const count = columnStructureCountMap[type];
    const elementId = getRandomId();

    const elementWidth = Math.floor(100 / count);

    return {
        ...defaultInnerElementSettings,
        id: elementId,
        parentId: parentId,
        children: [],
        isExtendable: false,
        settings: {
            ...defaultInnerElementSettings.settings,
            width: { value: elementWidth - 1, unit: StyleUnit.PERCENT },
        },
    };
}

export function processStructureType(type: ColumnStructure, parentId: string): InnerPageElement[] {
    const count = columnStructureCountMap[type];

    const result = [];

    for (let i = 0; i < count; i++) {
        const item = getInnerItemByType(type, parentId);

        result.push(item);
    }

    return result;
}
