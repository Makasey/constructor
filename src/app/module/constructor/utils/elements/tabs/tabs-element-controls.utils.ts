import { APFormControl, APFormDefaultTemplateKeys, APFormModel } from "@components";
import { DEFAULT_UPSERT_CONFIG, TabsElementSettingsGroup, TabsPageElement, getDefaultSizeSettings } from "@modules/constructor";

export function getTabsElementCountControls(element: TabsPageElement): APFormControl {
    return {
        id: "count",
        name: "count",
        value: element.settings.count,
        valueTemplateKey: APFormDefaultTemplateKeys.NUMBER_FIELD,
        options: {
            label: "Количество табов",
        },
    };
}

export function getTabsElementControls(element: TabsPageElement): APFormControl[] {
    return [...getDefaultSizeSettings(element), getTabsElementCountControls(element)];
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
