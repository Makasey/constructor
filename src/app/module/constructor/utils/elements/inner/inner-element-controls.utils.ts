import { APFormControl, APFormDefaultTemplateKeys, APFormModel } from "@components";
import {
    DEFAULT_UPSERT_CONFIG,
    InnerItemElementSettingsGroup,
    InnerPageElement,
    defaultJustifyContentItems,
    getDefaultSizeSettings,
} from "@modules/constructor";

function getInnerItemBackgroundColorControl(element: InnerPageElement): APFormControl {
    return {
        id: "backgroundColor",
        name: "backgroundColor",
        value: element.settings.background,
        valueTemplateKey: APFormDefaultTemplateKeys.COLOR_FIELD,
        options: {
            label: "Цвет бэкграунда",
        },
    };
}

function getInnerJustifyContentControl(element: InnerPageElement): APFormControl {
    return {
        id: "justifyContent",
        name: "justifyContent",
        value: element.settings.justifyContent,
        valueTemplateKey: APFormDefaultTemplateKeys.RADIO_GROUP_FIELD,
        options: {
            label: "justify-content",
            items: defaultJustifyContentItems,
        },
    };
}

export function getInnerItemElementSettings(element: InnerPageElement): APFormControl[] {
    return [...getDefaultSizeSettings(element)];
}

export function getInnerItemElementStyleControl(element: InnerPageElement): APFormControl[] {
    return [getInnerItemBackgroundColorControl(element), getInnerJustifyContentControl(element)];
}

export function getInnerSettings(element: InnerPageElement): APFormModel {
    return {
        id: "elementSettings",
        name: "elementSettings",
        upsertConfig: DEFAULT_UPSERT_CONFIG,
        controls: [],
        innerGroups: [
            {
                id: InnerItemElementSettingsGroup.SIZE_SETTINGS,
                name: InnerItemElementSettingsGroup.SIZE_SETTINGS,
                upsertConfig: DEFAULT_UPSERT_CONFIG,
                controls: getInnerItemElementSettings(element),
                headerText: "Настройки размера",
            },
            {
                id: InnerItemElementSettingsGroup.STYLE_SETTINGS,
                name: InnerItemElementSettingsGroup.STYLE_SETTINGS,
                upsertConfig: DEFAULT_UPSERT_CONFIG,
                controls: getInnerItemElementStyleControl(element),
                headerText: "Настройки стиля",
            },
        ],
    };
}
