import { SitePageElement } from "@modules/constructor";

export function deleteElementFromTree(items: Record<string, SitePageElement>, element: number): Record<string, SitePageElement> {
    const { id, children } = items[element];

    let itemsCopy = { ...items };

    children.forEach(child => {
        itemsCopy = deleteElementFromTree(itemsCopy, child);
    });

    delete itemsCopy[id];

    return itemsCopy;
}
