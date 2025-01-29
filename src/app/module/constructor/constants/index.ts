import {
    AccordionItemPageElementSettings,
    AccordionPageElementSettings,
    AlignItems,
    BackgroundType,
    BorderType,
    DividerPageElementSettings,
    ElementActionType,
    ElementActionsConfigItem,
    ElementButton,
    FlexWrap,
    ImagePageElementSettings,
    InnerPageElementSettings,
    JustifyContent,
    ObjectFit,
    ObjectFitPosition,
    SectionPageElementSettings,
    SitePageElementType,
    SitePageElementUnion,
    SliderPageElementItemSettings,
    SliderPageElementSettings,
    SpacerPageElementSettings,
    StyleUnit,
    TabsItemPageElementSettings,
    TabsPageElementSettings,
    TextPageElementSettings,
    TitlePageElementSettings,
    TypeKeys,
    defaultAccordionElementSettings,
    defaultAccordionItemElementSettings,
    defaultDividerElementSettings,
    defaultImageElementSettings,
    defaultInnerElementSettings,
    defaultLinkElementSettingsUtils,
    defaultPageElementSettings,
    defaultSectionElementSettings,
    defaultSliderElementSettings,
    defaultSliderItemElementSettings,
    defaultSpacerElementSettings,
    defaultTabsElementSettings,
    defaultTabsItemElementSettings,
    defaultTextElementSettings,
    defaultTitleElementSettings,
    possibleAccordionItemSiteElements,
    possibleInnerSiteElements,
    possiblePageSiteElements,
    possibleSectionSiteElements,
    possibleSliderItemSiteElements,
    possibleTabsItemSiteElements,
} from "@modules/constructor";
import { BorderFieldModel, defaultDirectionValue } from "@components";
import { InjectionToken } from "@angular/core";
import { SelectItem } from "@shared-types";
import { UpsertConfig } from "@ngneat/forms-manager/lib/types";

export const DEFAULT_UPSERT_CONFIG: UpsertConfig = {
    debounceTime: undefined,
};

export const ROOT_ELEMENT_ID = "rootID";

export const defaultRequestElementSettingsKey = "default";

export const ELEMENT_ID = new InjectionToken<string>("ELEMENT_ID", {
    factory: () => {
        return "";
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
    [StyleUnit.EMPTY]: "",
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

export const defaultDividerLineBorderSettings: BorderFieldModel = {
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

export const spacerPageElementSettingsStyleKeys: TypeKeys<SpacerPageElementSettings> = [
    "margin",
    "padding",
    "height",
    "width",
    "border",
    "background",
];

export const dividerPageElementSettingsStyleKeys: TypeKeys<DividerPageElementSettings> = [
    "margin",
    "padding",
    "height",
    "width",
    "background",
    "alignItems",
    "border",
    "text",
    "lineBorder",
];

export const accordionPageElementSettingsStyleKeys: TypeKeys<AccordionPageElementSettings> = [
    "margin",
    "padding",
    "height",
    "width",
    "count",
    "items",
    "selectedElement",
];

export const accordionItemPageElementSettingsStyleKeys: TypeKeys<AccordionItemPageElementSettings> = [
    "margin",
    "padding",
    "height",
    "width",
    "background",
    "title",
];

export const sliderPageElementSettingsStyleKeys: TypeKeys<SliderPageElementSettings> = ["width", "height", "gap"];

export const sliderItemPageElementSettingsStyleKeys: TypeKeys<SliderPageElementItemSettings> = ["background"];

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
    [SitePageElementType.SLIDER]: defaultSliderElementSettings(),
    [SitePageElementType.SLIDER_ITEM]: defaultSliderItemElementSettings(),
    [SitePageElementType.LINK]: defaultLinkElementSettingsUtils(),
};

export const possibleSiteElementsMap: Record<string, ElementButton[]> = {
    [SitePageElementType.PAGE]: possiblePageSiteElements(),
    [SitePageElementType.SECTION]: possibleSectionSiteElements(),
    [SitePageElementType.INNER]: possibleInnerSiteElements(),
    [SitePageElementType.ACCORDION_ITEM]: possibleAccordionItemSiteElements(),
    [SitePageElementType.TABS_ITEM]: possibleTabsItemSiteElements(),
    [SitePageElementType.SLIDER_ITEM]: possibleSliderItemSiteElements(),
};

export const duplicateElementActionConfig: ElementActionsConfigItem = {
    title: "Duplicate",
    icon: "bx bx-copy",
    action: ElementActionType.DUPLICATE,
};

export const deleteElementActionConfig: ElementActionsConfigItem = {
    title: "Delete",
    icon: "bx bx-trash",
    action: ElementActionType.DELETE,
};

export const saveElementActionConfig: ElementActionsConfigItem = {
    title: "Save",
    icon: "bx bx-save",
    action: ElementActionType.SAVE,
};

export const SAVE_SHOW_ELEMENTS_LOCALE_STORAGE_KEY = "showSavedItems";
export const SAVE_UPDATE_ITEMS_LOCALE_STORAGE_KEY = "savedUpdateItems";

export const defaultAutoSlideItems = [
    { label: "true", value: true, image: "eicon-plus-square" },
    { label: "false", value: false, image: "eicon-minus-square" },
];
