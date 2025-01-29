import { BackgroundType, LinkPageElement, SitePageElementType, StyleUnit } from "@modules/constructor";

export function defaultLinkElementSettingsUtils(): () => Omit<LinkPageElement, "id" | "parentId"> {
    return () => {
        return {
            type: SitePageElementType.LINK,
            children: [],
            isExtendable: false,
            settings: {
                text: "Hello Link",
                link: "",
                color: "#1b1c21",
                background: { backgroundType: BackgroundType.CLASSIC },
                width: {
                    value: 100,
                    unit: StyleUnit.PERCENT,
                },
                height: {
                    value: 40,
                    unit: StyleUnit.PX,
                },
            },
        };
    };
}
