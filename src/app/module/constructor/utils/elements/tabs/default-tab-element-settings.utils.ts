import { SitePageElementType, StyleUnit, TabsPageElement } from "@modules/constructor";

export function defaultTabsElementSettings(): () => Omit<TabsPageElement, "id" | "parentId"> {
    return () => {
        return {
            type: SitePageElementType.TABS,
            children: [],
            isExtendable: false,
            settings: {
                width: {
                    value: 100,
                    unit: StyleUnit.PERCENT,
                },
                selectedElement: "",
                items: [],
                height: {
                    value: 100,
                    unit: StyleUnit.PERCENT,
                },
                count: 2,
            },
        };
    };
}
