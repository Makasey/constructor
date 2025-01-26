import { EditorState } from "@core";
import { SitePageElementUnion } from "@modules/constructor";

export function processDuplicateSectionElement(
    updateTree: Record<string, SitePageElementUnion>,
    pages: string[],
    newId: string,
): Pick<EditorState, "items" | "selectedElement" | "pages"> {
    return {
        items: {
            ...updateTree,
        },
        pages: pages,
        selectedElement: newId,
    };
}
