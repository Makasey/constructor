import { EditorState } from "@core";
import { SitePageElementType, SitePageElementUnion, TabsItemPageElement, TabsPageElement } from "@modules/constructor";
import { arrayAdd } from "@datorama/akita";
import { getNewElement } from "@modules/constructor/utils/element-creation/element-creation.utils";

export function processTabsElementCreation(
    type: SitePageElementType,
    items: Record<string, SitePageElementUnion>,
    parentId: string,
): Pick<EditorState, "selectedElement" | "items"> & { createdElementIds: string[] } {
    const newElement = getNewElement<TabsPageElement>(type, parentId);
    const parentElement = items[newElement.parentId!];

    const tabItems: TabsItemPageElement[] = Array.from({ length: newElement.settings.count }).map(() =>
        getNewElement(SitePageElementType.TABS_ITEM, newElement.id),
    );
    const childrenIds = tabItems.map(item => item.id);
    const updatedItems = tabItems.reduce(
        (result, item) => {
            result[item.id] = item;

            return result;
        },
        { ...items },
    );

    const updatedElement: TabsPageElement = {
        ...newElement,
        settings: {
            ...newElement.settings,
            items: tabItems.map(tabItem => {
                return {
                    ...tabItem.settings,
                    id: tabItem.id,
                };
            }),
            selectedElement: tabItems[0].id,
        },
        children: arrayAdd(newElement.children, childrenIds),
    };

    return {
        createdElementIds: [newElement.id, ...childrenIds],
        selectedElement: tabItems[0].id,
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
