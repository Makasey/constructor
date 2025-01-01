import {
    AlignItems,
    BackgroundType,
    ElementHTMLTag,
    FlexWrap,
    JustifyContent,
    SectionPageElement,
    SitePageElementType,
    StyleUnit,
} from "@modules/constructor";
import { defaultBorderData, defaultDirectionValue } from "@components";

export function defaultSectionElementSettings(): () => Omit<SectionPageElement, "id" | "parentId"> {
    return () => {
        return {
            type: SitePageElementType.SECTION,
            children: [],
            isExtendable: true,
            settings: {
                width: {
                    value: 100,
                    unit: StyleUnit.PERCENT,
                },
                height: {
                    value: 200,
                    unit: StyleUnit.PX,
                },
                margin: {
                    ...defaultDirectionValue,
                },
                padding: {
                    ...defaultDirectionValue,
                },
                gap: {
                    value: 10,
                    unit: StyleUnit.PX,
                },
                letterSpacing: {
                    value: 0,
                    unit: StyleUnit.PX,
                },
                border: {
                    ...defaultBorderData,
                },
                opacity: 1,
                tag: ElementHTMLTag.SECTION,
                color: "#1b1c2d",
                background: { backgroundType: BackgroundType.CLASSIC },
                isInit: false,
                justifyContent: JustifyContent.START,
                flexWrap: FlexWrap.WRAP,
                alignItems: AlignItems.START,
            },
        };
    };
}
