import {
    ColumnStructure,
    InnerPageElement,
    InnerPageElementSettings,
    SitePageElementType,
    StyleUnit,
    columnStructureCountMap,
    defaultPageElementSettingsMap,
} from "@modules/constructor";
import { getRandomId } from "@shared-utils";

function getInnerItemByType(type: ColumnStructure, parentId: string): InnerPageElement {
    const count = columnStructureCountMap[type];
    const elementId = getRandomId();

    const elementWidth = Math.floor(100 / count) === 100 / count ? Math.floor(100 / count) - 1 : Math.floor(100 / count);
    const element = defaultPageElementSettingsMap[SitePageElementType.INNER]();

    return {
        ...element,
        id: elementId,
        parentId: parentId,
        children: [],
        isExtendable: true,
        settings: {
            ...element.settings,
            width: { value: elementWidth, unit: StyleUnit.PERCENT },
        } as InnerPageElementSettings,
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
