import {
    AccordionItemPageElement,
    AccordionPageElement,
    AlignItems,
    BackgroundType,
    BorderType,
    DividerPageElement,
    ElementHTMLTag,
    FlexWrap,
    ImagePageElement,
    ImagePageElementSettings,
    InnerPageElement,
    InnerPageElementSettings,
    JustifyContent,
    ObjectFit,
    ObjectFitPosition,
    SectionPageElement,
    SectionPageElementSettings,
    SitePageElement,
    SitePageElementType,
    SitePageElementUnion,
    SpacerPageElement,
    StyleUnit,
    TabsItemPageElement,
    TabsItemPageElementSettings,
    TabsPageElement,
    TabsPageElementSettings,
    TextPageElement,
    TextPageElementSettings,
    TitlePageElement,
    TitlePageElementSettings,
    TypeKeys,
} from "@modules/constructor";
import { BorderFieldModel, defaultBorderData, defaultDirectionValue } from "@components";
import { InjectionToken } from "@angular/core";
import { SelectItem } from "@shared-types";
import { UpsertConfig } from "@ngneat/forms-manager/lib/types";

export const DEFAULT_UPSERT_CONFIG: UpsertConfig = {
    debounceTime: 200,
};

export const ROOT_ELEMENT_ID = "rootID";

export const ELEMENT_ID = new InjectionToken<string>("ELEMENT_ID", {
    factory: () => {
        return ROOT_ELEMENT_ID;
    },
});

export const PARENT_ID = new InjectionToken<string>("PARENT_ID");

export const styleUnitMap: Record<StyleUnit, string> = {
    [StyleUnit.PX]: StyleUnit.PX,
    [StyleUnit.PERCENT]: "%",
    [StyleUnit.EM]: StyleUnit.EM,
    [StyleUnit.VH]: StyleUnit.VH,
    [StyleUnit.VW]: StyleUnit.VW,
    [StyleUnit.REM]: StyleUnit.REM,
};

export const defaultSpacerElementBorderSettings: BorderFieldModel = {
    borderWidth: {
        top: 1,
        bottom: 1,
        left: 1,
        right: 1,
        unit: StyleUnit.PX,
    },

    borderRadius: {
        ...defaultDirectionValue,
    },
    borderColor: "#000000",
    borderType: BorderType.SOLID,
};

export function defaultSectionElementSettings(): () => Omit<SectionPageElement, "id" | "parentId"> {
    return () => {
        return {
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
                border: {
                    ...defaultBorderData,
                },
                opacity: 1,
                tag: ElementHTMLTag.SECTION,
                color: "#1b1c2d",
                background: { backgroundType: BackgroundType.CLASSIC },
                isInit: false,
                justifyContent: JustifyContent.START,
                flexWrap: FlexWrap.WRAP,
                alignItems: AlignItems.START,
            },
        };
    };
}

export function defaultTitleElementSettings(): () => Omit<TitlePageElement, "id" | "parentId"> {
    return () => {
        return {
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
                    unit: StyleUnit.PX,
                },
                tag: ElementHTMLTag.H1,
                color: "#000000",
                background: { backgroundType: BackgroundType.CLASSIC },
                text: "Hello World",
                link: "",
            },
        };
    };
}

export function defaultTextElementSettings(): () => Omit<TextPageElement, "id" | "parentId"> {
    return () => {
        return {
            type: SitePageElementType.TEXT,
            children: [],
            isExtendable: false,
            settings: {
                width: {
                    value: 100,
                    unit: StyleUnit.PERCENT,
                },
                height: {
                    value: 16,
                    unit: StyleUnit.PX,
                },
                color: "#000000",
                background: { backgroundType: BackgroundType.CLASSIC },
                text: "Hello World",
            },
        };
    };
}

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

export function defaultInnerElementSettings(): () => Omit<InnerPageElement, "id" | "parentId"> {
    return () => {
        return {
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
                background: { backgroundType: BackgroundType.CLASSIC },
                justifyContent: JustifyContent.START,
                tag: ElementHTMLTag.ARTICLE,
            },
        };
    };
}

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

export function defaultSpacerElementSettings(): () => Omit<SpacerPageElement, "id" | "parentId"> {
    return () => {
        return {
            type: SitePageElementType.SPACER,
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
                    value: 50,
                    unit: StyleUnit.PX,
                },
                border: {
                    ...defaultSpacerElementBorderSettings,
                },
                background: { backgroundType: BackgroundType.CLASSIC },
            },
        };
    };
}

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
                    bottom: 10,
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
                    value: 50,
                    unit: StyleUnit.PX,
                },
                title: `Асскордин-${uniqueCounter}`,
                background: { backgroundType: BackgroundType.CLASSIC },
            },
        };
    };
}

export function defaultDividerElementSettings(): () => Omit<DividerPageElement, "id" | "parentId"> {
    return () => {
        return {
            type: SitePageElementType.DIVIDER,
            children: [],
            isExtendable: false,
            settings: {
                text: "Divider",
                alignItems: AlignItems.START,
                lineBorderType: BorderType.SOLID,
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
                    value: 50,
                    unit: StyleUnit.PX,
                },
                border: {
                    ...defaultSpacerElementBorderSettings,
                },
                background: { backgroundType: BackgroundType.CLASSIC },
            },
        };
    };
}

export const defaultPageElementSettingsMap: Record<SitePageElementType, () => Omit<SitePageElementUnion, "id" | "parentId">> = {
    [SitePageElementType.TITLE]: defaultTitleElementSettings(),
    [SitePageElementType.SECTION]: defaultSectionElementSettings(),
    [SitePageElementType.PAGE]: defaultPageElementSettings(),
    [SitePageElementType.INNER]: defaultInnerElementSettings(),
    [SitePageElementType.IMAGE]: defaultImageElementSettings(),
    [SitePageElementType.TABS]: defaultTabsElementSettings(),
    [SitePageElementType.TABS_ITEM]: defaultTabsItemElementSettings(),
    [SitePageElementType.TEXT]: defaultTextElementSettings(),
    [SitePageElementType.SPACER]: defaultSpacerElementSettings(),
    [SitePageElementType.ACCORDION]: defaultAccordionElementSettings(),
    [SitePageElementType.ACCORDION_ITEM]: defaultAccordionItemElementSettings(),
    [SitePageElementType.DIVIDER]: defaultDividerElementSettings(),
};

export const defaultSizeControlUnit: SelectItem<StyleUnit>[] = [
    { label: "%", value: StyleUnit.PERCENT },
    { label: StyleUnit.PX, value: StyleUnit.PX },
];

export const defaultTextControlElement: SelectItem<StyleUnit>[] = [
    { label: StyleUnit.PX, value: StyleUnit.PX },
    { label: StyleUnit.EM, value: StyleUnit.EM },
    { label: StyleUnit.REM, value: StyleUnit.REM },
];

export const defaultJustifyContentItems: SelectItem<JustifyContent, JustifyContent>[] = [
    { label: JustifyContent.START, value: JustifyContent.START, image: "eicon-justify-start-h" },
    { label: JustifyContent.CENTER, value: JustifyContent.CENTER, image: "eicon-justify-center-h" },
    { label: JustifyContent.END, value: JustifyContent.END, image: "eicon-justify-end-h" },
    { label: JustifyContent.SPACE_BETWEEN, value: JustifyContent.SPACE_BETWEEN, image: "eicon-justify-space-between-h" },
    { label: JustifyContent.SPACE_AROUND, value: JustifyContent.SPACE_AROUND, image: "eicon-justify-space-around-h" },
    { label: JustifyContent.SPACE_EVENLY, value: JustifyContent.SPACE_EVENLY, image: "eicon-justify-space-evenly-h" },
];

export const defaultBackgroundColorItems: SelectItem<BackgroundType>[] = [
    { label: BackgroundType.CLASSIC, value: BackgroundType.CLASSIC, image: "eicon-justify-start-h" },
    { label: BackgroundType.GRADIENT, value: BackgroundType.GRADIENT, image: "eicon-justify-center-h" },
];

export const defaultFlexWrapItems: SelectItem<FlexWrap, FlexWrap>[] = [
    { label: FlexWrap.WRAP, value: FlexWrap.WRAP, image: "eicon-wrap" },
    { label: FlexWrap.NO_WRAP, value: FlexWrap.NO_WRAP, image: "eicon-nowrap" },
    { label: FlexWrap.WRAP_REVERSE, value: FlexWrap.WRAP_REVERSE, image: "eicon-wrap-reverse" },
];

export const defaultAlignItemsItems: SelectItem<AlignItems, AlignItems>[] = [
    { label: AlignItems.START, value: AlignItems.START, image: "eicon-align-start-h" },
    { label: AlignItems.CENTER, value: AlignItems.CENTER, image: "eicon-align-center-h" },
    { label: AlignItems.END, value: AlignItems.END, image: "eicon-align-end-h" },
];

export const defaultBackgroundRepeatItems: SelectItem<string>[] = [
    { label: "Повторение по оси X", value: "repeat-x" },
    { label: "Повторение по оси Y", value: "repeat-y" },
    { label: "Повторение по осям X и Y", value: "repeat" },
    { label: "Без повторения", value: "no-repeat" },
];

export const defaultBackgroundSizeItems: SelectItem<string>[] = [
    { label: "Вместить", value: "contain" },
    { label: "Расширить", value: "cover" },
    { label: "Автоматически", value: "auto" },
];

export const sectionPageElementSettingsStylesKeys: TypeKeys<SectionPageElementSettings> = [
    "width",
    "height",
    "color",
    "background",
    "alignItems",
    "flexWrap",
    "gap",
    "justifyContent",
    "letterSpacing",
    "margin",
    "padding",
    "opacity",
    "border",
];

export const innerPageElementSettingsStyleKeys: TypeKeys<InnerPageElementSettings> = [
    "width",
    "height",
    "color",
    "background",
    "opacity",
    "letterSpacing",
    "justifyContent",
    "gap",
    "padding",
    "margin",
];

export const titlePageElementSettingsStylesKeys: TypeKeys<TitlePageElementSettings> = ["width", "height", "text", "color", "background"];

export const textPageElementSettingsStylesKeys: TypeKeys<TextPageElementSettings> = ["width", "height", "color", "background"];

export const imagePageElementSettingsStylesKeys: TypeKeys<ImagePageElementSettings> = ["width", "height", "image"];

export const tabsPageElementSettingsStyleKeys: TypeKeys<TabsPageElementSettings> = ["width", "height"];

export const tabsItemPageElementSettingsStyleKeys: TypeKeys<TabsItemPageElementSettings> = ["width", "height", "padding", "margin"];

export const objectFitMap: Record<ObjectFit, string> = {
    [ObjectFit.DEFAULT]: "none",
    [ObjectFit.CONTAIN]: "contain",
    [ObjectFit.COVER]: "cover",
    [ObjectFit.FILL]: "fill",
    [ObjectFit.SCALE_DOWN]: "scale-down",
    [ObjectFit.REVERT]: "revert",
    [ObjectFit.REVERT_LAYER]: "revert-layer",
};

export const objectFitPositionMap: Record<ObjectFitPosition, string> = {
    [ObjectFitPosition.CENTER_CENTER]: "center center",
    [ObjectFitPosition.CENTER_LEFT]: "center left",
    [ObjectFitPosition.CENTER_RIGHT]: "center right",
    [ObjectFitPosition.TOP_CENTER]: "top center",
    [ObjectFitPosition.TOP_LEFT]: "top left",
    [ObjectFitPosition.TOP_RIGHT]: "top right",
    [ObjectFitPosition.BOTTOM_CENTER]: "bottom center",
    [ObjectFitPosition.BOTTOM_LEFT]: "bottom left",
    [ObjectFitPosition.BOTTOM_RIGHT]: "bottom right",
};

export const defaultObjectFitItems: SelectItem<ObjectFit>[] = [
    {
        value: ObjectFit.DEFAULT,
        label: "Default",
    },
    {
        value: ObjectFit.FILL,
        label: "Fill",
    },
    {
        value: ObjectFit.COVER,
        label: "Cover",
    },
    {
        value: ObjectFit.CONTAIN,
        label: "Contain",
    },
    {
        value: ObjectFit.SCALE_DOWN,
        label: "Scale down",
    },
    {
        value: ObjectFit.REVERT,
        label: "Revert",
    },
    {
        value: ObjectFit.REVERT_LAYER,
        label: "Revert layer",
    },
];

export const defaultObjectFitPositionItems: SelectItem<ObjectFitPosition>[] = [
    {
        value: ObjectFitPosition.CENTER_CENTER,
        label: "Center Center",
    },
    {
        value: ObjectFitPosition.CENTER_LEFT,
        label: "Center Left",
    },
    {
        value: ObjectFitPosition.CENTER_RIGHT,
        label: "Center Right",
    },
    {
        value: ObjectFitPosition.TOP_CENTER,
        label: "Top Center",
    },
    {
        value: ObjectFitPosition.TOP_LEFT,
        label: "Top Left",
    },
    {
        value: ObjectFitPosition.TOP_RIGHT,
        label: "Top Right",
    },
    {
        value: ObjectFitPosition.BOTTOM_CENTER,
        label: "Bottom Center",
    },
    {
        value: ObjectFitPosition.BOTTOM_LEFT,
        label: "Bottom Left",
    },
    {
        value: ObjectFitPosition.BOTTOM_RIGHT,
        label: "Bottom Right",
    },
];

export const defaultRequestElementSettingsKey = "default";
