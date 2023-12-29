import { AccordionPageElement, SitePageElementSettingsUnion } from "@modules/constructor";
import { EditorState } from "@core";

export function processUpdateAccordionItemElementSettings<K extends SitePageElementSettingsUnion>(
    value: K | Partial<K>,
    state: EditorState,
    id: string,
): Partial<EditorState> {
    const { items } = state;
    const item = items[id];

    const parentId = item.parentId!;
    const parentElement = items[parentId] as AccordionPageElement;

    const processParentElement = parentElement.settings.items.map(element => {
        if (element.id !== id) {
            return element;
        }

        return {
            ...element,
            ...value,
        };
    });

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
            [parentId]: {
                ...parentElement,
                settings: {
                    ...parentElement.settings,
                    items: processParentElement,
                },
            },
        },
    };
}
