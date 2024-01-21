import { SitePageElement, SitePageElementType, StyleUnit } from "@modules/constructor";

export function defaultPageElementSettings(): () => Omit<SitePageElement, "id" | "parentId"> {
    return () => {
        return {
            type: SitePageElementType.PAGE,
            children: [],
            isExtendable: false,
            settings: {
                width: {
                    value: 100,
                    unit: StyleUnit.PERCENT,
                },
                height: {
                    value: 100,
                    unit: StyleUnit.PERCENT,
                },
            },
        };
    };
}
