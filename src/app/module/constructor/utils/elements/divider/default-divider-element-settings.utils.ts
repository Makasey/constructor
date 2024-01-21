import { AlignItems, BackgroundType, BorderType, DividerPageElement, SitePageElementType, StyleUnit } from "@modules/constructor";
import { defaultDirectionValue } from "@components";
import { defaultSpacerElementBorderSettings } from "@modules/constructor/constants";

export function defaultDividerElementSettings(): () => Omit<DividerPageElement, "id" | "parentId"> {
    return () => {
        return {
            type: SitePageElementType.DIVIDER,
            children: [],
            isExtendable: false,
            settings: {
                text: "Divider",
                alignItems: AlignItems.START,
                lineBorderType: BorderType.SOLID,
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
