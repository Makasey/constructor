import { EditorState } from "@core";
import { duplicateTreeElement } from "@modules/constructor";
import { getRandomId } from "@shared-utils";

export function processDuplicateElementsById(state: EditorState, id: string): Pick<EditorState, "items" | "selectedElement" | "pages"> {
    const { items, pages } = state;
    const newId = getRandomId();
    const element = items[id];
    const parentId = element.parentId;

    const updateTree = duplicateTreeElement(items, element, parentId!, newId);

    return {
        items: {
            ...updateTree,
        },
        pages,
        selectedElement: newId,
    };
}
