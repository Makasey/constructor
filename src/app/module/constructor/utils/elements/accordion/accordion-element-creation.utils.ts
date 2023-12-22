import { AccordionItemPageElement, AccordionPageElement, SitePageElementType, SitePageElementUnion } from "@modules/constructor";
import { EditorState } from "@core";
import { arrayAdd } from "@datorama/akita";
import { getNewElement } from "@modules/constructor/utils/element-creation/element-creation.utils";

export function processAccordionElementCreation(
    type: SitePageElementType,
    items: Record<string, SitePageElementUnion>,
    parentId: string,
): Partial<EditorState> {
    const newElement = getNewElement<AccordionPageElement>(type, parentId);
    const parentElement = items[newElement.parentId!];

    const accordionItems: AccordionItemPageElement[] = Array.from({ length: newElement.settings.count }).map(() =>
        getNewElement(SitePageElementType.ACCORDION_ITEM, newElement.id),
    );

    const childrenIds = accordionItems.map(item => item.id);
    const updatedItems = accordionItems.reduce((result, item) => {
        result[item.id] = item;

        return result;
    }, items);

    const updatedElement: AccordionPageElement = {
        ...newElement,
        settings: {
            ...newElement.settings,
            items: accordionItems.map(accordionItem => {
                return {
                    ...accordionItem.settings,
                    id: accordionItem.id,
                };
            }),
            selectedElement: newElement.id,
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
