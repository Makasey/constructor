import { ElementButton, SitePageElement, SitePageElementType } from "@modules/constructor";
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
    const stack = [targetElement];
    let itemId: string | null = newElementId ?? getRandomId();
    const parentCache = {
        [targetElement.parentId!]: parentId,
    };

    while (stack.length) {
        const duplicatedElement = stack.pop()!;
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
            stack.push(items[child]);
        });

        itemId = null;
    }

    return items;
}

export function processPossibleElements(type: SitePageElementType): ElementButton[] {
    switch (type) {
        case SitePageElementType.PAGE: {
            return [
                {
                    title: "Секция",
                    type: SitePageElementType.SECTION,
                    icon: "bxs-layout",
                },
            ];
        }

        case SitePageElementType.SECTION: {
            return [
                {
                    title: "Элемент секции",
                    type: SitePageElementType.INNER,
                    icon: "bx-rectangle",
                },
            ];
        }

        case SitePageElementType.INNER: {
            return [
                {
                    title: "Заголовок",
                    type: SitePageElementType.TITLE,
                    icon: "bx-font",
                },
                {
                    title: "Изображение",
                    type: SitePageElementType.IMAGE,
                    icon: "bxs-image-alt",
                },
                {
                    title: "Текст",
                    type: SitePageElementType.TEXT,
                    icon: "bx-highlight",
                },
                {
                    title: "Секция",
                    type: SitePageElementType.SECTION,
                    icon: "bxs-layout",
                },
                {
                    title: "Табы",
                    type: SitePageElementType.TABS,
                    icon: "bx-dock-top",
                },
                {
                    title: "Спэйсер",
                    type: SitePageElementType.SPACER,
                    icon: "bx-collapse-vertical",
                },
                {
                    title: "Ассордион",
                    type: SitePageElementType.ACCORDION,
                    icon: "bx-list-check",
                },
            ];
        }

        case SitePageElementType.TITLE: {
            return [];
        }

        case SitePageElementType.TEXT: {
            return [];
        }

        case SitePageElementType.TABS_ITEM: {
            return [
                {
                    title: "Заголовок",
                    type: SitePageElementType.TITLE,
                    icon: "bx-font",
                },
                {
                    title: "Текст",
                    type: SitePageElementType.TEXT,
                    icon: "bx-highlight",
                },
                {
                    title: "Изображение",
                    type: SitePageElementType.IMAGE,
                    icon: "bxs-image-alt",
                },
                {
                    title: "Секция",
                    type: SitePageElementType.SECTION,
                    icon: "bxs-layout",
                },
                {
                    title: "Табы",
                    type: SitePageElementType.TABS,
                    icon: "bx-dock-top",
                },
                {
                    title: "Спэйсер",
                    type: SitePageElementType.SPACER,
                    icon: "bx-collapse-vertical",
                },
                {
                    title: "Ассордион",
                    type: SitePageElementType.ACCORDION,
                    icon: "bx-list-check",
                },
            ];
        }

        case SitePageElementType.ACCORDION_ITEM: {
            return [
                {
                    title: "Заголовок",
                    type: SitePageElementType.TITLE,
                    icon: "bx-font",
                },
                {
                    title: "Текст",
                    type: SitePageElementType.TEXT,
                    icon: "bx-highlight",
                },
                {
                    title: "Изображение",
                    type: SitePageElementType.IMAGE,
                    icon: "bxs-image-alt",
                },
                {
                    title: "Секция",
                    type: SitePageElementType.SECTION,
                    icon: "bxs-layout",
                },
                {
                    title: "Табы",
                    type: SitePageElementType.TABS,
                    icon: "bx-dock-top",
                },
                {
                    title: "Спэйсер",
                    type: SitePageElementType.SPACER,
                    icon: "bx-collapse-vertical",
                },
                {
                    title: "Ассордион",
                    type: SitePageElementType.ACCORDION,
                    icon: "bx-list-check",
                },
            ];
        }

        default: {
            return [];
        }
    }
}
