import { SitePageElementType, StyleUnit, TabsItemPageElement } from "@modules/constructor";
import { defaultDirectionValue } from "@components";

export function defaultTabsItemElementSettings(): () => Omit<TabsItemPageElement, "id" | "parentId"> {
    let uniqueCounter = 0;

    return () => {
        uniqueCounter++;

        return {
            type: SitePageElementType.TABS_ITEM,
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
                title: `Таб-${uniqueCounter}`,
                height: {
                    value: 100,
                    unit: StyleUnit.PERCENT,
                },
            },
        };
    };
}
