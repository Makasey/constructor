import { AccordionItemPageElement, BackgroundType, SitePageElementType, StyleUnit } from "@modules/constructor";
import { defaultDirectionValue } from "@components";

export function defaultAccordionItemElementSettings(): () => Omit<AccordionItemPageElement, "id" | "parentId"> {
    let uniqueCounter = 0;

    return () => {
        uniqueCounter++;

        return {
            type: SitePageElementType.ACCORDION_ITEM,
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
                    value: 500,
                    unit: StyleUnit.PX,
                },
                title: `Асскордин-${uniqueCounter}`,
                background: { backgroundType: BackgroundType.CLASSIC },
            },
        };
    };
}
