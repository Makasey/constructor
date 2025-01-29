import { ElementButton, SitePageElementType } from "@modules/constructor";

export function possibleInnerSiteElements(): ElementButton[] {
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
        {
            title: "Девайдер",
            type: SitePageElementType.DIVIDER,
            icon: "bx-expand-vertical",
        },
        {
            title: "Слайдер",
            type: SitePageElementType.SLIDER,
            icon: "bx-list-check",
        },
        {
            title: "Ссылка",
            type: SitePageElementType.LINK,
            icon: "bx-highlight",
        },
    ];
}
