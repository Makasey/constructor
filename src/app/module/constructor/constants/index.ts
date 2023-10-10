import {
    AlignItems,
    ElementHTMLTag,
    FlexWrap,
    ImagePageElement,
    InnerPageElement,
    JustifyContent,
    SectionPageElement,
    SitePageElement,
    SitePageElementType,
    SitePageElementUnion,
    StyleUnit,
    TabsPageElement,
    TitlePageElement,
} from "@modules/constructor";
import { InjectionToken } from "@angular/core";
import { UpsertConfig } from "@ngneat/forms-manager/lib/types";
import { defaultDirectionValue } from "@components";

export const DEFAULT_UPSERT_CONFIG: UpsertConfig = {
    debounceTime: 500,
};

export const ROOT_ELEMENT_ID = 1;

export const ELEMENT_ID = new InjectionToken<number>("ELEMENT_ID", {
    factory: () => {
        return ROOT_ELEMENT_ID;
    },
});

export const PARENT_ID = new InjectionToken<number>("PARENT_ID");

export const styleUnitMap: Record<StyleUnit, string> = {
    [StyleUnit.PX]: StyleUnit.PX,
    [StyleUnit.PERCENT]: "%",
    [StyleUnit.EM]: StyleUnit.EM,
    [StyleUnit.VH]: StyleUnit.VH,
    [StyleUnit.VW]: StyleUnit.VW,
    [StyleUnit.REM]: StyleUnit.REM,
};

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
        margin: {
            ...defaultDirectionValue,
        },
        padding: {
            ...defaultDirectionValue,
        },
        gap: {
            value: 10,
            unit: StyleUnit.PX,
        },
        letterSpacing: {
            value: 0,
            unit: StyleUnit.PX,
        },
        opacity: 1,
        tag: ElementHTMLTag.SECTION,
        color: "#1b1c2d",
        backgroundColor: "#ffffff",
        isInit: false,
        justifyContent: JustifyContent.START,
        flexWrap: FlexWrap.NO_WRAP,
        alignItems: AlignItems.START,
    },
};

export const defaultTitleElementSettings: Omit<TitlePageElement, "id" | "parentId"> = {
    type: SitePageElementType.TITLE,
    children: [],
    isExtendable: false,
    settings: {
        width: {
            value: 100,
            unit: StyleUnit.PERCENT,
        },
        height: {
            value: 20,
            unit: StyleUnit.PERCENT,
        },
        tag: ElementHTMLTag.H1,
        color: "#000000",
        backgroundColor: "transparent",
        text: "Hello World",
        link: "",
    },
};

export const defaultPageElementSettings: Omit<SitePageElement, "id" | "parentId"> = {
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

export const defaultInnerElementSettings: Omit<InnerPageElement, "id" | "parentId"> = {
    type: SitePageElementType.INNER,
    children: [],
    isExtendable: false,
    settings: {
        width: {
            value: 100,
            unit: StyleUnit.PERCENT,
        },
        height: {
            value: 100,
            unit: StyleUnit.PX,
        },
        gap: {
            value: 0,
            unit: StyleUnit.PX,
        },
        letterSpacing: {
            value: 0,
            unit: StyleUnit.PX,
        },
        margin: {
            ...defaultDirectionValue,
        },
        padding: {
            ...defaultDirectionValue,
        },
        opacity: 1,
        color: "#000000",
        backgroundColor: "#c25656",
        justifyContent: JustifyContent.START,
        tag: ElementHTMLTag.ARTICLE,
    },
};

export const defaultImageElementSettings: Omit<ImagePageElement, "id" | "parentId"> = {
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
            src: "https://us1.wpdemo.org/wpd_1696513527_9424/tmp-site-q3qtfbcsqglvl.us1.wpdemo.org/wp-content/plugins/elementor/assets/images/placeholder.png",
        },
        alt: "",
        title: "",
    },
};

export const defaultTabsElementSettings: Omit<TabsPageElement, "id" | "parentId"> = {
    type: SitePageElementType.TABS,
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
        count: 2,
    },
};

export const defaultPageElementSettingsMap: Record<SitePageElementType, Omit<SitePageElementUnion, "id" | "parentId">> = {
    [SitePageElementType.TITLE]: defaultTitleElementSettings,
    [SitePageElementType.SECTION]: defaultSectionElementSettings,
    [SitePageElementType.PAGE]: defaultPageElementSettings,
    [SitePageElementType.INNER]: defaultInnerElementSettings,
    [SitePageElementType.IMAGE]: defaultImageElementSettings,
    [SitePageElementType.TABS]: defaultTabsElementSettings,
};

export const defaultSizeControlUnit = [
    { label: "%", value: StyleUnit.PERCENT },
    { label: StyleUnit.PX, value: StyleUnit.PX },
];

export const defaultTextControlElement = [
    { label: StyleUnit.PX, value: StyleUnit.PX },
    { label: StyleUnit.EM, value: StyleUnit.EM },
    { label: StyleUnit.REM, value: StyleUnit.REM },
];

export const defaultJustifyContentItems = [
    { label: JustifyContent.START, value: JustifyContent.START, image: "eicon-justify-start-h" },
    { label: JustifyContent.CENTER, value: JustifyContent.CENTER, image: "eicon-justify-center-h" },
    { label: JustifyContent.END, value: JustifyContent.END, image: "eicon-justify-end-h" },
    { label: JustifyContent.SPACE_BETWEEN, value: JustifyContent.SPACE_BETWEEN, image: "eicon-justify-space-between-h" },
    { label: JustifyContent.SPACE_AROUND, value: JustifyContent.SPACE_AROUND, image: "eicon-justify-space-around-h" },
    { label: JustifyContent.SPACE_EVENLY, value: JustifyContent.SPACE_EVENLY, image: "eicon-justify-space-evenly-h" },
];

export const defaultFlexWrapItems = [
    { label: FlexWrap.WRAP, value: FlexWrap.WRAP, image: "eicon-wrap" },
    { label: FlexWrap.NO_WRAP, value: FlexWrap.NO_WRAP, image: "eicon-nowrap" },
    { label: FlexWrap.WRAP_REVERSE, value: FlexWrap.WRAP_REVERSE, image: "eicon-wrap-reverse" },
];

export const defaultAlignItemsItems = [
    { label: AlignItems.START, value: AlignItems.START, image: "eicon-align-start-h" },
    { label: AlignItems.CENTER, value: AlignItems.CENTER, image: "eicon-align-center-h" },
    { label: AlignItems.END, value: AlignItems.END, image: "eicon-align-end-h" },
];
