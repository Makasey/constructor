import { ElementButton, SitePageElement, SitePageElementType, possibleSiteElementsMap } from "@modules/constructor";
import { arrayAdd } from "@datorama/akita";
import { getRandomId } from "@shared-utils";

export function deleteElementFromTree(items: Record<string, SitePageElement>, element: string): Record<string, SitePageElement> {
    const { id, children } = items[element];

    let itemsCopy = { ...items };

    children.forEach(child => {
        itemsCopy = deleteElementFromTree(itemsCopy, child);
    });

    delete itemsCopy[id];

    return itemsCopy;
}

export function duplicateTreeElement(
    items: Record<string, SitePageElement>,
    targetElement: SitePageElement,
    parentId: string,
    newElementId: string | null = null,
): Record<string, SitePageElement> {
    const queue = [targetElement];
    let itemId: string | null = newElementId ?? getRandomId();
    const parentCache = {
        [targetElement.parentId!]: parentId,
    };

    while (queue.length) {
        const duplicatedElement = queue.shift()!;
        const newElementId = itemId ?? getRandomId();
        const parentId = parentCache[duplicatedElement.parentId!];

        const newElement = {
            ...duplicatedElement,
            children: [],
            parentId: parentId,
            id: newElementId,
        } as SitePageElement;

        parentCache[duplicatedElement.id] = newElement.id;

        items = {
            ...items,
            [parentId]: {
                ...items[parentId],
                children: arrayAdd(items[parentId].children, newElementId),
            },
            [newElementId]: newElement,
        };

        duplicatedElement.children.forEach(child => {
            queue.push(items[child]);
        });

        itemId = null;
    }

    return items;
}

export function processPossibleElements(type: SitePageElementType): ElementButton[] {
    switch (type) {
        case SitePageElementType.PAGE: {
            return possibleSiteElementsMap[SitePageElementType.PAGE];
        }

        case SitePageElementType.SECTION: {
            return possibleSiteElementsMap[SitePageElementType.SECTION];
        }

        case SitePageElementType.INNER: {
            return possibleSiteElementsMap[SitePageElementType.INNER];
        }

        case SitePageElementType.TABS_ITEM: {
            return possibleSiteElementsMap[SitePageElementType.TABS_ITEM];
        }

        case SitePageElementType.ACCORDION_ITEM: {
            return possibleSiteElementsMap[SitePageElementType.ACCORDION_ITEM];
        }

        default: {
            return [];
        }
    }
}
