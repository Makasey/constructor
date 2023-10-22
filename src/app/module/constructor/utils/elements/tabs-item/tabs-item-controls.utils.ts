import { APFormControl, APFormDefaultTemplateKeys, APFormModel } from "@components";
import { DEFAULT_UPSERT_CONFIG, TabsItemPageElement, defaultSizeControlUnit } from "@modules/constructor";
import { TabsItemElementSettingsGroup } from "@modules/constructor";

function getTabsItemElementMarginControl(element: TabsItemPageElement): APFormControl {
    return {
        id: "margin",
        name: "margin",
        value: element.settings.margin,
        valueTemplateKey: APFormDefaultTemplateKeys.DIRECTION_FIELD,
        options: {
            selectLabelKey: "label",
            selectValueKey: "value",
            max: 1000,
            min: -1000,
            items: defaultSizeControlUnit,
            label: "Margin",
        },
    };
}

function getTabsItemPaddingControl(element: TabsItemPageElement): APFormControl {
    return {
        id: "padding",
        name: "padding",
        value: element.settings.padding,
        valueTemplateKey: APFormDefaultTemplateKeys.DIRECTION_FIELD,
        options: {
            selectLabelKey: "label",
            selectValueKey: "value",
            max: 1000,
            min: 0,
            items: defaultSizeControlUnit,
            label: "Padding",
        },
    };
}

function getTabsItemElementControls(element: TabsItemPageElement): APFormControl[] {
    return [getTabsItemElementMarginControl(element), getTabsItemPaddingControl(element)];
}

export function getTabsItemSettings(element: TabsItemPageElement): APFormModel {
    return {
        id: "elementSettings",
        name: "elementSettings",
        upsertConfig: DEFAULT_UPSERT_CONFIG,
        controls: [],
        innerGroups: [
            {
                id: TabsItemElementSettingsGroup.STYLE_SETTINGS,
                name: TabsItemElementSettingsGroup.STYLE_SETTINGS,
                upsertConfig: DEFAULT_UPSERT_CONFIG,
                controls: getTabsItemElementControls(element),
                headerText: "Настройки табы",
            },
        ],
    };
}
