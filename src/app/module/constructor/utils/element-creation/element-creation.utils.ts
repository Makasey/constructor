import { EditorState } from "@core";
import { SitePageElementType, SitePageElementUnion, TabsPageElement, defaultPageElementSettingsMap } from "@modules/constructor";
import { arrayAdd, logAction } from "@datorama/akita";
import { getRandomId } from "@shared-utils";

export function getNewElement<T extends SitePageElementUnion>(type: SitePageElementType, parentId: string): T {
    const newElementID = getRandomId();
    logAction(`Add element with id: ${newElementID}, type: ${type}`);
    const defaultElementData = defaultPageElementSettingsMap[type]();
    return {
        ...defaultElementData,
        id: newElementID,
        parentId: parentId,
        settings: {
            ...defaultElementData.settings,
        },
    } as T;
}

export function processElementCreation(
    type: SitePageElementType,
    items: Record<string, SitePageElementUnion>,
    parentId: string,
): Partial<EditorState> {
    switch (type) {
        case SitePageElementType.TABS: {
            const newElement = getNewElement<TabsPageElement>(type, parentId);
            const parentElement = items[newElement.parentId!];

            const tabItems = Array.from({ length: newElement.settings.count }).map(() => getNewElement(SitePageElementType.TABS_ITEM, newElement.id));
            const childrenIds = tabItems.map(item => item.id);
            const updatedItems = tabItems.reduce((result, item) => {
                result[item.id] = item;

                return result;
            }, items);

            const updatedElement: TabsPageElement = {
                ...newElement,
                settings: {
                    ...newElement.settings,
                    selectedElement: tabItems[0].id,
                },
                children: arrayAdd(newElement.children, childrenIds),
            };

            return {
                selectedElement: newElement.id,
                items: {
                    ...updatedItems,
                    [parentId]: {
                        ...parentElement,
                        children: arrayAdd(parentElement.children, newElement.id),
                    },
                    [newElement.id]: updatedElement,
                },
            };
        }

        default: {
            const newElement = getNewElement(type, parentId);
            const parentElement = items[newElement.parentId!];

            return {
                selectedElement: newElement.id,
                items: {
                    ...items,
                    [parentId]: {
                        ...parentElement,
                        children: arrayAdd(parentElement.children, newElement.id),
                    },
                    [newElement.id]: newElement,
                },
            };
        }
    }
}
