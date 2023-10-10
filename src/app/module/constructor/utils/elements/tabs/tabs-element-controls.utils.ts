import { APFormControl, APFormModel } from "@components";
import { DEFAULT_UPSERT_CONFIG, TabsElementSettingsGroup, TabsPageElement, getDefaultSizeSettings } from "@modules/constructor";

export function getTabsElementControls(element: TabsPageElement): APFormControl[] {
    return [...getDefaultSizeSettings(element)];
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
