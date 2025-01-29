import {
    AccordionItemPageElement,
    AccordionPageElement,
    CreateCampaignModel,
    CreatePreviewModel,
    DividerPageElement,
    ImagePageElement,
    InnerPageElement,
    RequestElementSettings,
    SectionPageElement,
    SitePageElement,
    SitePageElementSettingsUnion,
    SitePageElementType,
    SitePageElementUnion,
    SitePageRequestElement,
    SliderItemPageElement,
    SliderPageElement,
    SpacerPageElement,
    TabsItemPageElement,
    TabsPageElement,
    TextPageElement,
    TitlePageElement,
    TypeKeys,
    accordionItemPageElementSettingsStyleKeys,
    accordionPageElementSettingsStyleKeys,
    defaultRequestElementSettingsKey,
    dividerPageElementSettingsStyleKeys,
    imagePageElementSettingsStylesKeys,
    innerPageElementSettingsStyleKeys,
    sectionPageElementSettingsStylesKeys,
    sliderItemPageElementSettingsStyleKeys,
    sliderPageElementSettingsStyleKeys,
    spacerPageElementSettingsStyleKeys,
    tabsItemPageElementSettingsStyleKeys,
    tabsPageElementSettingsStyleKeys,
    textPageElementSettingsStylesKeys,
    titlePageElementSettingsStylesKeys,
} from "@modules/constructor";
import { EditorState, UIDataState } from "@core";
import { RootElement } from "@modules/constructor/components/elements/root/types";

export function getPreviewData(state: EditorState): CreatePreviewModel {
    const { pages, items } = state;

    return {
        type: "page",
        body: {
            pages: pages,
            elements: items,
        },
    };
}

export function processRequestElementSettings<T extends SitePageElementUnion>(
    settings: T["settings"],
    styleKeys: Record<string, TypeKeys<T["settings"]>>,
): RequestElementSettings<T["settings"]> {
    const defaultValue: RequestElementSettings<T["settings"]> = {
        default: {},
    };

    return (Object.keys(settings) as TypeKeys<T["settings"]>).reduce((result, key) => {
        const settingsKey = Object.keys(styleKeys).reduce((resultKey, currentKey) => {
            const item = styleKeys[currentKey];

            if (item.includes(key)) {
                return currentKey;
            }

            return resultKey;
        }, defaultRequestElementSettingsKey);

        return {
            ...result,
            [settingsKey]: {
                ...(result[settingsKey] ?? {}),
                [key]: settings[key],
            },
        };
    }, defaultValue);
}

export function processRequestElementData<T extends SitePageElementUnion>(
    item: T,
    stylesKeys: Record<string, TypeKeys<T["settings"]>>,
): SitePageRequestElement<Partial<T["settings"]>> {
    const processedSettings = processRequestElementSettings<T>(item.settings, stylesKeys);

    return {
        ...item,
        settings: processedSettings,
    };
}

export function processElementDataCreation(item: SitePageElementUnion): SitePageRequestElement {
    switch (item.type) {
        case SitePageElementType.TITLE: {
            return processRequestElementData(item as TitlePageElement, { styles: titlePageElementSettingsStylesKeys, default: [] });
        }

        case SitePageElementType.TEXT: {
            return processRequestElementData(item as TextPageElement, { styles: textPageElementSettingsStylesKeys, default: [] });
        }

        case SitePageElementType.SECTION: {
            return processRequestElementData(item as SectionPageElement, { styles: sectionPageElementSettingsStylesKeys, default: [] });
        }

        case SitePageElementType.IMAGE: {
            return processRequestElementData(item as ImagePageElement, { styles: imagePageElementSettingsStylesKeys, default: [] });
        }

        case SitePageElementType.INNER: {
            return processRequestElementData(item as InnerPageElement, { styles: innerPageElementSettingsStyleKeys, default: [] });
        }

        case SitePageElementType.TABS: {
            return processRequestElementData(item as TabsPageElement, { styles: tabsPageElementSettingsStyleKeys, default: [] });
        }

        case SitePageElementType.TABS_ITEM: {
            return processRequestElementData(item as TabsItemPageElement, { styles: tabsItemPageElementSettingsStyleKeys, default: [] });
        }

        case SitePageElementType.ACCORDION_ITEM: {
            return processRequestElementData(item as AccordionItemPageElement, { styles: accordionItemPageElementSettingsStyleKeys, default: [] });
        }

        case SitePageElementType.ACCORDION: {
            return processRequestElementData(item as AccordionPageElement, { styles: accordionPageElementSettingsStyleKeys, default: [] });
        }

        case SitePageElementType.DIVIDER: {
            return processRequestElementData(item as DividerPageElement, { styles: dividerPageElementSettingsStyleKeys, default: [] });
        }

        case SitePageElementType.SPACER: {
            return processRequestElementData(item as SpacerPageElement, { styles: spacerPageElementSettingsStyleKeys, default: [] });
        }

        case SitePageElementType.SLIDER: {
            return processRequestElementData(item as SliderPageElement, { styles: sliderPageElementSettingsStyleKeys, default: [] });
        }

        case SitePageElementType.SLIDER_ITEM: {
            return processRequestElementData(item as SliderItemPageElement, { styles: sliderItemPageElementSettingsStyleKeys, default: [] });
        }

        case SitePageElementType.PAGE: {
            return processRequestElementData(item as RootElement, {});
        }

        case SitePageElementType.LINK: {
            return processRequestElementData(item as RootElement, {});
        }
    }
}

export function getCampaignData(state: EditorState): CreateCampaignModel {
    const { pages, items, campaignName } = state;
    const processedItems = Object.keys(items).reduce((result, key) => {
        return {
            ...result,
            [key]: processElementDataCreation(items[key]),
        };
    }, {});

    return {
        campaignName: campaignName,
        pages: pages,
        elements: processedItems,
    };
}

export function processCampaignResponseItemSettings(
    settings: SitePageRequestElement<SitePageElementSettingsUnion>["settings"],
): SitePageElement["settings"] {
    return Object.values(settings).reduce((result, settingsItem) => {
        return {
            ...result,
            ...settingsItem,
        };
    }, {}) as SitePageElementSettingsUnion;
}

export function processCampaignResponse(campaign: CreateCampaignModel & { id: number }): EditorState {
    const { elements, id, campaignName, pages } = campaign;
    const processedItems = Object.keys(elements).reduce(
        (result, key) => {
            const item = elements[key] as SitePageRequestElement<SitePageElementSettingsUnion>;

            result[key] = {
                ...item,
                settings: {
                    ...processCampaignResponseItemSettings(item.settings),
                },
            };

            return result;
        },
        {} as Record<string, SitePageElementUnion>,
    );

    return {
        items: processedItems,
        dataState: UIDataState.LOADED,
        pages: pages,
        selectedPage: pages[0],
        selectedElement: pages[0],
        id: id,
        campaignName: campaignName,
        savedItems: [],
    };
}
