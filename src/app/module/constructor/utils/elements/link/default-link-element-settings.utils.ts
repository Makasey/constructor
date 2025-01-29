import { BackgroundType, LinkPageElement, LinkTargetType, SitePageElementType, StyleUnit } from "@modules/constructor";

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
                target: LinkTargetType.BLANK,
                background: { backgroundType: BackgroundType.CLASSIC },
                width: {
                    value: "fit-content",
                    unit: StyleUnit.EMPTY,
                },
                height: {
                    value: 40,
                    unit: StyleUnit.PX,
                },
            },
        };
    };
}
