import { ElementButton, SitePageElement, SitePageElementType } from "@modules/constructor";

export function deleteElementFromTree(items: Record<string, SitePageElement>, element: string): Record<string, SitePageElement> {
    const { id, children } = items[element];

    let itemsCopy = { ...items };

    children.forEach(child => {
        itemsCopy = deleteElementFromTree(itemsCopy, child);
    });

    delete itemsCopy[id];

    return itemsCopy;
}

export function processPossibleElements(type: SitePageElementType): ElementButton[] {
    switch (type) {
        case SitePageElementType.PAGE: {
            return [
                {
                    title: "Секция",
                    type: SitePageElementType.SECTION,
                    icon: "bx-font",
                },
            ];
        }

        case SitePageElementType.SECTION: {
            return [
                {
                    title: "Элемент секции",
                    type: SitePageElementType.INNER,
                    icon: "bx-font",
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
                    icon: "bx-font",
                },
                {
                    title: "Секция",
                    type: SitePageElementType.SECTION,
                    icon: "bx-font",
                },
                {
                    title: "Табы",
                    type: SitePageElementType.TABS,
                    icon: "bx-font",
                },
            ];
        }

        case SitePageElementType.TITLE: {
            return [
                {
                    title: "Изображение",
                    type: SitePageElementType.IMAGE,
                    icon: "bx-font",
                },
            ];
        }

        default: {
            return [];
        }
    }
}
