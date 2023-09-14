import { SitePageElement } from "@modules/constructor/components/edit-area/types";

export function deleteElementFromTree(items: Record<string, SitePageElement>, element: number): Record<string, SitePageElement> {
    const { id, children } = items[element];

    let itemsCopy = { ...items };

    children.forEach(child => {
        itemsCopy = deleteElementFromTree(itemsCopy, child);
    });

    delete itemsCopy[id];

    return itemsCopy;
}
