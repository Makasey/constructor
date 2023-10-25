import { APFormControl, APFormDefaultTemplateKeys, APFormModel } from "@components";
import {
    DEFAULT_UPSERT_CONFIG,
    SitePageElementType,
    TabsElementSettingsGroup,
    TabsPageElement,
    defaultPageElementSettingsMap,
    getDefaultSizeSettings,
} from "@modules/constructor";

function getTabsItemsControls(element: TabsPageElement): APFormControl {
    return {
        id: "items",
        name: "items",
        value: element.settings.items,
        valueTemplateKey: APFormDefaultTemplateKeys.ITEMS_CONTROL_FIELD,
        options: {
            label: "Элементы",
            defaultItemFn: () => defaultPageElementSettingsMap[SitePageElementType.TABS_ITEM]().settings,
        },
    };
}

export function getTabsElementControls(element: TabsPageElement): APFormControl[] {
    return [...getDefaultSizeSettings(element), getTabsItemsControls(element)];
}

export function getTabsSettings(element: TabsPageElement): APFormModel {
    return {
        id: "elementSettings",
        name: "elementSettings",
        upsertConfig: DEFAULT_UPSERT_CONFIG,
        controls: [],
        innerGroups: [
            {
                id: TabsElementSettingsGroup.STYLE_SETTINGS,
                name: TabsElementSettingsGroup.STYLE_SETTINGS,
                upsertConfig: DEFAULT_UPSERT_CONFIG,
                controls: getTabsElementControls(element),
                headerText: "Настройки табов",
            },
        ],
    };
}
