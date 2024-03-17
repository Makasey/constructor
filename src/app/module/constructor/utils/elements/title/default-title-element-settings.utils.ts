import { BackgroundType, ElementHTMLTag, SitePageElementType, StyleUnit, TitlePageElement } from "@modules/constructor";

export function defaultTitleElementSettings(): () => Omit<TitlePageElement, "id" | "parentId"> {
    return () => {
        return {
            type: SitePageElementType.TITLE,
            children: [],
            isExtendable: false,
            settings: {
                width: {
                    value: 100,
                    unit: StyleUnit.PERCENT,
                },
                height: {
                    value: 40,
                    unit: StyleUnit.PX,
                },
                tag: ElementHTMLTag.H1,
                color: "#000000",
                background: { backgroundType: BackgroundType.CLASSIC },
                text: "Hello World",
                link: "",
            },
        };
    };
}
