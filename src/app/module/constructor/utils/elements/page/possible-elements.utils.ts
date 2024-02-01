import { ElementButton, SitePageElementType } from "@modules/constructor";

export function possiblePageSiteElements(): ElementButton[] {
    return [
        {
            title: "Секция",
            type: SitePageElementType.SECTION,
            icon: "bxs-layout",
        },
    ];
}
