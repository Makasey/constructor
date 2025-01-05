import { SitePageElementType, SliderPageElement, StyleUnit } from "@modules/constructor";
import { defaultDirectionValue } from "@components";

export function defaultSliderElementSettings(): () => Omit<SliderPageElement, "id" | "parentId"> {
    return () => {
        return {
            type: SitePageElementType.SLIDER,
            children: [],
            isExtendable: false,
            settings: {
                width: {
                    value: 50,
                    unit: StyleUnit.PERCENT,
                },
                height: {
                    value: 100,
                    unit: StyleUnit.PERCENT,
                },
                margin: {
                    ...defaultDirectionValue,
                },
                padding: {
                    top: 10,
                    bottom: 20,
                    left: 10,
                    right: 10,
                    unit: StyleUnit.PX,
                },
                selectedElement: "",
                count: 3,
                items: [],
            },
        };
    };
}
