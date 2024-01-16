import { APFormControl, APFormDefaultTemplateKeys, APFormModel } from "@components";
import {
    DEFAULT_UPSERT_CONFIG,
    DividerElementSettingsGroup,
    DividerPageElement,
    defaultAlignItemsItems,
    defaultBorderTypeControls,
    defaultSizeControlUnit,
    getDefaultSizeSettings,
} from "@modules/constructor";

function getDividerElementBackgroundControl(element: DividerPageElement): APFormControl {
    return {
        id: "background",
        name: "background",
        value: element.settings.background,
        valueTemplateKey: APFormDefaultTemplateKeys.BACKGROUND_FIELD,
        options: {
            label: "Цвет бэкграунда",
        },
    };
}

function getDividerElementTextControl(element: DividerPageElement): APFormControl {
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

function getDividerElementMarginControl(element: DividerPageElement): APFormControl {
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

function getDividerBorderControl(element: DividerPageElement): APFormControl {
    return {
        id: "tag",
        name: "tag",
        value: element.settings.lineBorderType,
        valueTemplateKey: APFormDefaultTemplateKeys.DROPDOWN_FIELD,
        options: {
            selectLabelKey: "label",
            selectValueKey: "value",
            items: defaultBorderTypeControls,
            label: "Тип линии",
        },
    };
}

function getDividerAlignItemsControl(element: DividerPageElement): APFormControl {
    return {
        id: "alignItems",
        name: "alignItems",
        value: element.settings.alignItems,
        valueTemplateKey: APFormDefaultTemplateKeys.RADIO_GROUP_FIELD,
        options: {
            label: "align-items",
            items: defaultAlignItemsItems,
        },
    };
}

function getDividerElementPaddingControl(element: DividerPageElement): APFormControl {
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

function getDividerElementBorderControl(element: DividerPageElement): APFormControl {
    return {
        id: "border",
        name: "border",
        value: element.settings.border,
        valueTemplateKey: APFormDefaultTemplateKeys.BORDER_FIELD,
        options: {
            label: "Border",
        },
    };
}

function getDividerLineSettings(element: DividerPageElement): APFormControl[] {
    return [getDividerElementTextControl(element), getDividerBorderControl(element), getDividerAlignItemsControl(element)];
}

function getDividerElementSizeControls(element: DividerPageElement): APFormControl[] {
    return [...getDefaultSizeSettings(element), getDividerElementPaddingControl(element), getDividerElementMarginControl(element)];
}

function getDividerElementBorderControls(element: DividerPageElement): APFormControl[] {
    return [getDividerElementBorderControl(element)];
}

function getDividerElementStyleControls(element: DividerPageElement): APFormControl[] {
    return [getDividerElementBackgroundControl(element)];
}

export function getDividerElementSettings(element: DividerPageElement): APFormModel {
    return {
        id: "elementSettings",
        name: "elementSettings",
        upsertConfig: DEFAULT_UPSERT_CONFIG,
        controls: [],
        innerGroups: [
            {
                id: DividerElementSettingsGroup.LINE_SETTINGS,
                name: DividerElementSettingsGroup.LINE_SETTINGS,
                upsertConfig: DEFAULT_UPSERT_CONFIG,
                controls: getDividerLineSettings(element),
                headerText: "Настройки линии",
            },
            {
                id: DividerElementSettingsGroup.SIZE_SETTINGS,
                name: DividerElementSettingsGroup.SIZE_SETTINGS,
                upsertConfig: DEFAULT_UPSERT_CONFIG,
                controls: getDividerElementSizeControls(element),
                headerText: "Настройки размера",
            },
            {
                id: DividerElementSettingsGroup.STYLE_SETTINGS,
                name: DividerElementSettingsGroup.STYLE_SETTINGS,
                upsertConfig: DEFAULT_UPSERT_CONFIG,
                controls: getDividerElementStyleControls(element),
                headerText: "Настройки стиля",
            },
            {
                id: DividerElementSettingsGroup.BORDER_SETTINGS,
                name: DividerElementSettingsGroup.SIZE_SETTINGS,
                upsertConfig: DEFAULT_UPSERT_CONFIG,
                controls: getDividerElementBorderControls(element),
                headerText: "Настройка бордера",
            },
        ],
    };
}
