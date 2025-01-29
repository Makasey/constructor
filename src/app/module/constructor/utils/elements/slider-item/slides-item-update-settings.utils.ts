import { EditorState } from "@core";
import { SitePageElementUnion, SliderPageElement } from "@modules/constructor";

export function processUpdateSliderItemElementSettings<K extends SitePageElementUnion>(
    value: K["settings"] | Partial<K["settings"]>,
    state: EditorState,
    id: string,
): Partial<EditorState> {
    const { items } = state;
    const item = items[id];

    const parentId = item.parentId!;
    const parentElement = items[parentId] as SliderPageElement;

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
            } as K,
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
