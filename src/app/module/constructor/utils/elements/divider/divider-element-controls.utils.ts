import { APFormControl, APFormDefaultTemplateKeys, APFormModel } from "@components";
import {
    DEFAULT_UPSERT_CONFIG,
    DividerElementSettingsGroup,
    DividerPageElement,
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
