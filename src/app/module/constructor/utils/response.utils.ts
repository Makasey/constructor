import {
    CreateCampaignModel,
    CreatePreviewModel,
    ImagePageElement,
    InnerPageElement,
    SectionPageElement,
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
import { EditorState } from "@core";

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
