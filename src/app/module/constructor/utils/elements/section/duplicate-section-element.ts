import { EditorState, Page } from "@core";
import { SitePageElementUnion } from "@modules/constructor";
import { arrayAdd } from "@datorama/akita";

export function processDuplicateSectionElement(
    updateTree: Record<string, SitePageElementUnion>,
    pages: Page[],
    newId: string,
    selectedPage: string,
): Partial<EditorState> {
    const updatePages = pages.map(page => {
        if (page.id === selectedPage) {
            return {
                ...page,
                children: arrayAdd(page.children, newId),
            };
        }

        return page;
    });

    return {
        items: {
            ...updateTree,
        },
        pages: updatePages,
        selectedElement: newId,
    };
}
