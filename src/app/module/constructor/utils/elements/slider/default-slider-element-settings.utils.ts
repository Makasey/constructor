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
                    value: 100,
                    unit: StyleUnit.PERCENT,
                },
                height: {
                    value: 180,
                    unit: StyleUnit.PX,
                },
                margin: {
                    ...defaultDirectionValue,
                },
                padding: {
                    top: 10,
                    bottom: 10,
                    left: 10,
                    right: 10,
                    unit: StyleUnit.PX,
                },
                selectedElement: "",
                count: 5,
                items: [],
                scrollingItemsCount: 1,
                showItemsCount: 1,
                autoSlide: false,
                autoSlideTimeout: 2000,
                gap: 0,
            },
        };
    };
}
