import { EditorState } from "@core";
import { SitePageElementType, SitePageElementUnion, SliderItemPageElement, SliderPageElement, StyleUnit } from "@modules/constructor";
import { arrayAdd } from "@datorama/akita";
import { getNewElement } from "@modules/constructor/utils/element-creation/element-creation.utils";

export function processSliderElementCreation(
    type: SitePageElementType,
    items: Record<string, SitePageElementUnion>,
    parentId: string,
): Partial<EditorState> {
    const newElement = getNewElement<SliderPageElement>(type, parentId);
    const parentElement = items[newElement.parentId!];
    const sliderItems: SliderItemPageElement[] = Array.from({ length: newElement.settings.count }).map(() =>
        getNewElement(SitePageElementType.SLIDER_ITEM, newElement.id),
    );
    const childrenIds = sliderItems.map(item => item.id);
    const updatedItems = sliderItems.reduce((result, item) => {
        result[item.id] = {
            ...item,
            settings: {
                ...item.settings,
                width: {
                    unit: StyleUnit.PERCENT,
                    value: Math.floor(100 / newElement.settings.showItemsCount),
                },
            },
        };

        return result;
    }, items);

    const updatedElement: SliderPageElement = {
        ...newElement,
        settings: {
            ...newElement.settings,
            items: sliderItems.map(sliserItem => {
                return {
                    ...sliserItem.settings,
                    id: sliserItem.id,
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
