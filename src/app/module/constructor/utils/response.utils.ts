import {
    CreateCampaignModel,
    CreatePreviewModel,
    ImagePageElement,
    InnerPageElement,
    ROOT_ELEMENT_ID,
    SectionPageElement,
    SitePageElement,
    SitePageElementSettingsUnion,
    SitePageElementType,
    SitePageElementUnion,
    SitePageRequestElement,
    TabsItemPageElement,
    TabsPageElement,
    TextPageElement,
    TitlePageElement,
    TypeKeys,
    imagePageElementSettingsStylesKeys,
    innerPageElementSettingsStyleKeys,
    sectionPageElementSettingsStylesKeys,
    tabsItemPageElementSettingsStyleKeys,
    tabsPageElementSettingsStyleKeys,
    textPageElementSettingsStylesKeys,
    titlePageElementSettingsStylesKeys,
} from "@modules/constructor";
import { EditorState, UIDataState } from "@core";

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

export function processRequestElementSettings<T extends SitePageElementSettingsUnion>(
    settings: T,
    styleKeys: TypeKeys<T>,
): {
    styles: Partial<T>;
    attributes: Partial<T>;
} {
    return (Object.keys(settings) as TypeKeys<T>).reduce(
        (result, key) => {
            if (styleKeys.includes(key)) {
                return {
                    ...result,
                    styles: {
                        ...result.styles,
                        [key]: settings[key],
                    },
                };
            }

            return {
                ...result,
                attributes: {
                    ...result.attributes,
                    [key]: settings[key],
                },
            };
        },
        { attributes: {}, styles: {} },
    );
}

export function processRequestElementData<T extends SitePageElementUnion>(
    item: T,
    stylesKeys: TypeKeys<T["settings"]>,
): SitePageRequestElement<Partial<T["settings"]>, Partial<T["settings"]>> {
    const processedSettings = processRequestElementSettings(item.settings, stylesKeys);

    return {
        ...item,
        settings: processedSettings,
    };
}

export function processElementDataCreation(item: SitePageElementUnion): SitePageRequestElement {
    switch (item.type) {
        case SitePageElementType.TITLE: {
            return processRequestElementData(item as TitlePageElement, titlePageElementSettingsStylesKeys);
        }

        case SitePageElementType.TEXT: {
            return processRequestElementData(item as TextPageElement, textPageElementSettingsStylesKeys);
        }

        case SitePageElementType.SECTION: {
            return processRequestElementData(item as SectionPageElement, sectionPageElementSettingsStylesKeys);
        }

        case SitePageElementType.IMAGE: {
            return processRequestElementData(item as ImagePageElement, imagePageElementSettingsStylesKeys);
        }

        case SitePageElementType.INNER: {
            return processRequestElementData(item as InnerPageElement, innerPageElementSettingsStyleKeys);
        }

        case SitePageElementType.TABS: {
            return processRequestElementData(item as TabsPageElement, tabsPageElementSettingsStyleKeys);
        }

        case SitePageElementType.TABS_ITEM: {
            return processRequestElementData(item as TabsItemPageElement, tabsItemPageElementSettingsStyleKeys);
        }

        default: {
            return processRequestElementData(item, []);
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
    settings: SitePageRequestElement<SitePageElementSettingsUnion, SitePageElementSettingsUnion>["settings"],
): SitePageElement["settings"] {
    return Object.values(settings).reduce((result, settingsItem) => {
        return {
            ...result,
            ...settingsItem,
        } as SitePageElementSettingsUnion;
    }, {} as SitePageElementSettingsUnion);
}

export function processCampaignResponse(campaign: CreateCampaignModel & { id: number }): EditorState {
    const { elements, id, campaignName, pages } = campaign;
    const processedItems = Object.keys(elements).reduce(
        (result, key) => {
            const item = elements[key] as SitePageRequestElement<SitePageElementSettingsUnion, SitePageElementSettingsUnion>;

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
        selectedPage: pages[0].id,
        selectedElement: ROOT_ELEMENT_ID,
        id: id,
        campaignName: campaignName,
    };
}
