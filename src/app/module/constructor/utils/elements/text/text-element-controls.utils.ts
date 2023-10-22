import { DEFAULT_UPSERT_CONFIG, TextElementSettingsGroup, TextPageElement, getDefaultSizeSettings } from "@modules/constructor";

import { APFormControl, APFormDefaultTemplateKeys, APFormModel } from "@components";

function getTextBackgroundColorControl(element: TextPageElement): APFormControl {
    return {
        id: "backgroundColor",
        name: "backgroundColor",
        value: element.settings.backgroundColor ?? "#ffffff",
        valueTemplateKey: APFormDefaultTemplateKeys.COLOR_FIELD,
        options: {
            label: "Цвет бэкграунда",
        },
    };
}

function getTextTextControl(element: TextPageElement): APFormControl {
    return {
        id: "text",
        name: "text",
        value: element.settings.text ?? null,
        valueTemplateKey: APFormDefaultTemplateKeys.TEXTAREA_FIELD,
        options: {
            maxLength: 300,
            label: "Текст элемента",
        },
    };
}

function getTextColorControl(element: TextPageElement): APFormControl {
    return {
        id: "color",
        name: "color",
        value: element.settings.color ?? "#1b1c21",
        valueTemplateKey: APFormDefaultTemplateKeys.COLOR_FIELD,
        options: {
            label: "Цвет текста",
        },
    };
}

function getTextElementSizeControls(element: TextPageElement): APFormControl[] {
    return [...getDefaultSizeSettings(element)];
}

function getTextElementTextControl(element: TextPageElement): APFormControl[] {
    return [getTextTextControl(element), getTextColorControl(element)];
}

function getTextElementStyleControl(element: TextPageElement): APFormControl[] {
    return [getTextBackgroundColorControl(element)];
}

export function getTextSettings(element: TextPageElement): APFormModel {
    return {
        id: "elementSettings",
        name: "elementSettings",
        upsertConfig: DEFAULT_UPSERT_CONFIG,
        controls: [],
        innerGroups: [
            {
                id: TextElementSettingsGroup.SIZE_SETTINGS,
                name: TextElementSettingsGroup.SIZE_SETTINGS,
                upsertConfig: DEFAULT_UPSERT_CONFIG,
                controls: getTextElementSizeControls(element),
                headerText: "Настройки размера",
            },
            {
                id: TextElementSettingsGroup.TEXT_SETTINGS,
                name: TextElementSettingsGroup.TEXT_SETTINGS,
                upsertConfig: DEFAULT_UPSERT_CONFIG,
                controls: getTextElementTextControl(element),
                headerText: "Настройки текста",
            },
            {
                id: TextElementSettingsGroup.STYLE_SETTINGS,
                name: TextElementSettingsGroup.STYLE_SETTINGS,
                upsertConfig: DEFAULT_UPSERT_CONFIG,
                controls: getTextElementStyleControl(element),
                headerText: "Настройки стилей",
            },
        ],
    };
}
