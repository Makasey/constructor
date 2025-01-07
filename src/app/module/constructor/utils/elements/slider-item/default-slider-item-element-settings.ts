import { BackgroundType, SitePageElementType, SliderItemPageElement, StyleUnit } from "@modules/constructor";
import { defaultDirectionValue } from "@components";

export function defaultSliderItemElementSettings(): () => Omit<SliderItemPageElement, "id" | "parentId"> {
    let counter = 0;

    return () => {
        counter++;
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
                title: `element-${counter}`,
            },
        };
    };
}
