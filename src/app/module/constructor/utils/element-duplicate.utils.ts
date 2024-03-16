import { EditorState } from "@core";
import { SitePageElementType, duplicateTreeElement, processDuplicateSectionElement } from "@modules/constructor";
import { getRandomId } from "@shared-utils";

export function processDuplicateElementsById(state: EditorState, id: string): Partial<EditorState> {
    const { items, selectedPage, pages } = state;
    const newId = getRandomId();
    const element = items[id];
    const parentId = element.parentId;
    const { type } = element;

    const updateTree = duplicateTreeElement(items, element, parentId!, newId);

    switch (type) {
        case SitePageElementType.SECTION: {
            return processDuplicateSectionElement(updateTree, pages, newId, selectedPage);
        }
        default: {
            return {
                items: {
                    ...updateTree,
                },
                selectedElement: newId,
            };
        }
    }
}
