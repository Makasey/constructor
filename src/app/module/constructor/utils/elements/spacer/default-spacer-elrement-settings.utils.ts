import { BackgroundType, SitePageElementType, SpacerPageElement, StyleUnit } from "@modules/constructor";
import { defaultDirectionValue } from "@components";
import { defaultSpacerElementBorderSettings } from "@modules/constructor/constants";

export function defaultSpacerElementSettings(): () => Omit<SpacerPageElement, "id" | "parentId"> {
    return () => {
        return {
            type: SitePageElementType.SPACER,
            children: [],
            isExtendable: false,
            settings: {
                margin: {
                    ...defaultDirectionValue,
                },
                padding: {
                    ...defaultDirectionValue,
                },
                width: {
                    value: 100,
                    unit: StyleUnit.PERCENT,
                },
                height: {
                    value: 50,
                    unit: StyleUnit.PX,
                },
                border: {
                    ...defaultSpacerElementBorderSettings,
                },
                background: { backgroundType: BackgroundType.CLASSIC },
            },
        };
    };
}
