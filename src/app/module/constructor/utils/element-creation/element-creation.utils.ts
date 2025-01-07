import { EditorState } from "@core";
import {
    SitePageElementSettingsUnion,
    SitePageElementType,
    SitePageElementUnion,
    defaultPageElementSettingsMap,
    processAccordionElementCreation,
    processSliderElementCreation,
    processTabsElementCreation,
    processUpdateAccordionElementSettings,
    processUpdateAccordionItemElementSettings,
    processUpdateSliderItemElementSettings,
    processUpdateSliderSettings,
    processUpdateTabsElementSettings,
    processUpdateTabsItemElementSettings,
} from "@modules/constructor";
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
            return processTabsElementCreation(type, items, parentId);
        }

        case SitePageElementType.ACCORDION: {
            return processAccordionElementCreation(type, items, parentId);
        }

        case SitePageElementType.SLIDER: {
            return processSliderElementCreation(type, items, parentId);
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

export function processUpdateElementSettings<K extends SitePageElementSettingsUnion>(
    value: K | Partial<K>,
    state: EditorState,
    id: string,
): Partial<EditorState> {
    const { items } = state;
    const item = items[id];

    switch (item.type) {
        case SitePageElementType.TABS: {
            return processUpdateTabsElementSettings(value, state, id);
        }

        case SitePageElementType.TABS_ITEM: {
            return processUpdateTabsItemElementSettings(value, state, id);
        }

        case SitePageElementType.ACCORDION: {
            return processUpdateAccordionElementSettings(value, state, id);
        }

        case SitePageElementType.ACCORDION_ITEM: {
            return processUpdateAccordionItemElementSettings(value, state, id);
        }

        case SitePageElementType.SLIDER: {
            return processUpdateSliderSettings(value, state, id);
        }

        case SitePageElementType.SLIDER_ITEM: {
            return processUpdateSliderItemElementSettings(value, state, id);
        }

        default: {
            return {
                items: {
                    ...items,
                    [id]: {
                        ...item,
                        settings: {
                            ...item.settings,
                            ...value,
                        },
                    },
                },
            };
        }
    }
}
