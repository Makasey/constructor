import { ImagePageElement, ObjectFit, ObjectFitPosition, SitePageElementType, StyleUnit } from "@modules/constructor";

export function defaultImageElementSettings(): () => Omit<ImagePageElement, "id" | "parentId"> {
    return () => {
        return {
            type: SitePageElementType.IMAGE,
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
                image: {
                    alt: "",

                    title: "",
                    src: "/assets/icons/placeholder/image.png",
                },
                maxWidth: {
                    value: 100,
                    unit: StyleUnit.PERCENT,
                },
                objectFit: ObjectFit.DEFAULT,
                objectPosition: ObjectFitPosition.CENTER_CENTER,
            },
        };
    };
}
