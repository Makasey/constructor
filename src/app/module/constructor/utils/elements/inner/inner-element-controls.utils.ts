import { APFormControl, APFormDefaultTemplateKeys, APFormModel } from "@components";
import {
    DEFAULT_UPSERT_CONFIG,
    InnerItemElementSettingsGroup,
    InnerPageElement,
    SectionPageElement,
    defaultJustifyContentItems,
    getDefaultSizeSettings,
} from "@modules/constructor";

function getInnerItemBackgroundColorControl(element: SectionPageElement): APFormControl {
    return {
        id: "backgroundColor",
        name: "backgroundColor",
        value: element.settings.backgroundColor ?? "#c25656",
        valueTemplateKey: APFormDefaultTemplateKeys.COLOR_FIELD,
        options: {
            label: "Цвет бэкграунда",
        },
    };
}

function getInnerJustifyContentControl(element: SectionPageElement): APFormControl {
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

export function getInnerItemElementSettings(element: SectionPageElement): APFormControl[] {
    return [...getDefaultSizeSettings(element)];
}

export function getInnerItemElementStyleControl(element: SectionPageElement): APFormControl[] {
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
