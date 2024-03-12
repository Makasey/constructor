import { BackgroundType, SitePageElementType, StyleUnit, TextPageElement } from "@modules/constructor";

export function defaultTextElementSettings(): () => Omit<TextPageElement, "id" | "parentId"> {
    return () => {
        return {
            type: SitePageElementType.TEXT,
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
                color: "#000000",
                background: { backgroundType: BackgroundType.CLASSIC },
                text: "Hello World",
            },
        };
    };
}
