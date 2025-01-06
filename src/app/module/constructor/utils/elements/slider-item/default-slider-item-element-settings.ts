import { BackgroundType, SitePageElementType, SliderItemPageElement, StyleUnit } from "@modules/constructor";
import { defaultDirectionValue } from "@components";

export function defaultSliderItemElementSettings(): () => Omit<SliderItemPageElement, "id" | "parentId"> {
    return () => {
        return {
            type: SitePageElementType.SLIDER_ITEM,
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
                background: { backgroundType: BackgroundType.CLASSIC },
            },
        };
    };
}
