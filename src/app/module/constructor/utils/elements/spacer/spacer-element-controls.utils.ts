import { APFormControl, APFormDefaultTemplateKeys, APFormModel } from "@components";
import {
    DEFAULT_UPSERT_CONFIG,
    SpacerElementSettingsGroup,
    SpacerPageElement,
    defaultSizeControlUnit,
    getDefaultSizeSettings,
} from "@modules/constructor";

function getSpacerElementBackgroundColorControl(element: SpacerPageElement): APFormControl {
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

function getSpacerElementMarginControl(element: SpacerPageElement): APFormControl {
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

function getSpacerElementPaddingControl(element: SpacerPageElement): APFormControl {
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

function getSpacerElementBorderControl(element: SpacerPageElement): APFormControl {
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

function getSpacerElementBorderControls(element: SpacerPageElement): APFormControl[] {
    return [getSpacerElementBorderControl(element)];
}

function getSpacerElementSizeControl(element: SpacerPageElement): APFormControl[] {
    return [...getDefaultSizeSettings(element)];
}

function getSpacerElementStyleControl(element: SpacerPageElement): APFormControl[] {
    return [getSpacerElementMarginControl(element), getSpacerElementPaddingControl(element), getSpacerElementBackgroundColorControl(element)];
}

export function getSpacerElementSettings(element: SpacerPageElement): APFormModel {
    return {
        id: "elementSettings",
        name: "elementSettings",
        upsertConfig: DEFAULT_UPSERT_CONFIG,
        controls: [],
        innerGroups: [
            {
                id: SpacerElementSettingsGroup.SIZE_SETTINGS,
                name: SpacerElementSettingsGroup.SIZE_SETTINGS,
                upsertConfig: DEFAULT_UPSERT_CONFIG,
                controls: getSpacerElementSizeControl(element),
                headerText: "Настройки размера",
            },
            {
                id: SpacerElementSettingsGroup.STYLE_SETTINGS,
                name: SpacerElementSettingsGroup.STYLE_SETTINGS,
                upsertConfig: DEFAULT_UPSERT_CONFIG,
                controls: getSpacerElementStyleControl(element),
                headerText: "Настройки стиля",
            },
            {
                id: SpacerElementSettingsGroup.BORDER_SETTINGS,
                name: SpacerElementSettingsGroup.BORDER_SETTINGS,
                upsertConfig: DEFAULT_UPSERT_CONFIG,
                controls: getSpacerElementBorderControls(element),
                headerText: "Настройка бордера",
            },
        ],
    };
}
