import { BackgroundType, ElementHTMLTag, InnerPageElement, JustifyContent, SitePageElementType, StyleUnit } from "@modules/constructor";
import { defaultDirectionValue } from "@components";

export function defaultInnerElementSettings(): () => Omit<InnerPageElement, "id" | "parentId"> {
    return () => {
        return {
            type: SitePageElementType.INNER,
            children: [],
            isExtendable: true,
            settings: {
                width: {
                    value: 100,
                    unit: StyleUnit.PERCENT,
                },
                height: {
                    value: 100,
                    unit: StyleUnit.PX,
                },
                gap: {
                    value: 0,
                    unit: StyleUnit.PX,
                },
                letterSpacing: {
                    value: 0,
                    unit: StyleUnit.PX,
                },
                margin: {
                    ...defaultDirectionValue,
                },
                padding: {
                    ...defaultDirectionValue,
                },
                opacity: 1,
                color: "#000000",
                background: { backgroundType: BackgroundType.CLASSIC },
                justifyContent: JustifyContent.START,
                tag: ElementHTMLTag.ARTICLE,
            },
        };
    };
}
