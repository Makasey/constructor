import { ElementButton, SitePageElementType } from "@modules/constructor";

export function possibleSectionSiteElements(): ElementButton[] {
    return [
        {
            title: "Элемент секции",
            type: SitePageElementType.INNER,
            icon: "bx-rectangle",
        },
    ];
}
