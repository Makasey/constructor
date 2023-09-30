import { ElementHTMLTag, SectionPageElement, SitePageElementType, StyleUnit } from "@modules/constructor";
import { defaultDirectionValue } from "@components";

export const defaultSectionTagControls = [
    { label: ElementHTMLTag.SECTION, value: ElementHTMLTag.SECTION },
    { label: ElementHTMLTag.DIV, value: ElementHTMLTag.DIV },
    { label: ElementHTMLTag.ARTICLE, value: ElementHTMLTag.ARTICLE },
];

export const defaultSectionElementSettings: Omit<SectionPageElement, "id" | "parentId"> = {
    type: SitePageElementType.SECTION,
    children: [],
    isExtendable: false,
    settings: {
        width: {
            value: 100,
            unit: StyleUnit.PERCENT,
        },
        height: {
            value: 200,
            unit: StyleUnit.PX,
        },
        text: "Hello World!",
        tag: ElementHTMLTag.SECTION,
        color: "#1b1c2d",
        backgroundColor: "#ffffff",
        margin: {
            ...defaultDirectionValue,
        },
        padding: {
            ...defaultDirectionValue,
        },
    },
};

export const defaultSectionOpacityStep = 0.01;
