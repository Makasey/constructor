import { AccordionPageElement, SitePageElementType, StyleUnit } from "@modules/constructor";
import { defaultDirectionValue } from "@components";

export function defaultAccordionElementSettings(): () => Omit<AccordionPageElement, "id" | "parentId"> {
    return () => {
        return {
            type: SitePageElementType.ACCORDION,
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
                items: [],
                count: 3,
            },
        };
    };
}
