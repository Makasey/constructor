import { APFormControl, APFormDefaultTemplateKeys, APFormModel } from "@components";
import {
    DEFAULT_UPSERT_CONFIG,
    SectionElementSettingsGroup,
    SectionPageElement,
    defaultSectionOpacityStep,
    defaultSectionTagControls,
    defaultSizeControlUnit,
    defaultTextControlElement,
    getDefaultSizeSettings,
} from "@modules/constructor";

function getSectionTextControl(element: SectionPageElement): APFormControl {
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

function getSectionHTMLTagControl(element: SectionPageElement): APFormControl {
    return {
        id: "tag",
        name: "tag",
        value: element.settings.tag,
        valueTemplateKey: APFormDefaultTemplateKeys.DROPDOWN_FIELD,
        options: {
            selectLabelKey: "label",
            selectValueKey: "value",
            items: defaultSectionTagControls,
            label: "Тип тега",
        },
    };
}

function getSectionLetterSpacingControl(element: SectionPageElement): APFormControl {
    return {
        id: "letterSpacing",
        name: "letterSpacing",
        value: element.settings.letterSpacing,
        valueTemplateKey: APFormDefaultTemplateKeys.RANGE_FIELD_WITH_UNIT_FIELD,
        options: {
            selectLabelKey: "label",
            selectValueKey: "value",
            step: 1,
            min: -5,
            max: 10,
            items: defaultTextControlElement,
            label: "Letter spacing",
        },
    };
}

function getSectionOpacityControl(element: SectionPageElement): APFormControl {
    return {
        id: "opacity",
        name: "opacity",
        value: element.settings.opacity,
        valueTemplateKey: APFormDefaultTemplateKeys.RANGE_FIELD,
        options: {
            step: defaultSectionOpacityStep,
            min: 0,
            max: 1,
            label: "Opacity",
        },
    };
}

function getSectionPaddingControl(element: SectionPageElement): APFormControl {
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

function getSectionMarginControl(element: SectionPageElement): APFormControl {
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

function getSectionColorControl(element: SectionPageElement): APFormControl {
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

function getSectionBackgroundColorControl(element: SectionPageElement): APFormControl {
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

function getSectionGapControl(element: SectionPageElement): APFormControl {
    return {
        id: "gap",
        name: "gap",
        value: element.settings.gap,
        valueTemplateKey: APFormDefaultTemplateKeys.NUMBER_WITH_DROPDOWN_FIELD,
        options: {
            selectLabelKey: "label",
            selectValueKey: "value",
            items: defaultTextControlElement,
            label: "gap секции",
        },
    };
}

export function getSectionElementSizeControls(element: SectionPageElement): APFormControl[] {
    return [...getDefaultSizeSettings(element), getSectionGapControl(element)];
}

export function getSectionElementTextControl(element: SectionPageElement): APFormControl[] {
    return [
        getSectionTextControl(element),
        getSectionHTMLTagControl(element),
        getSectionLetterSpacingControl(element),
        getSectionOpacityControl(element),
        getSectionColorControl(element),
    ];
}

export function getSectionElementStyleControl(element: SectionPageElement): APFormControl[] {
    return [getSectionPaddingControl(element), getSectionMarginControl(element), getSectionBackgroundColorControl(element)];
}

export function getSectionSettings(element: SectionPageElement): APFormModel {
    return {
        id: "elementSettings",
        name: "elementSettings",
        upsertConfig: DEFAULT_UPSERT_CONFIG,
        controls: [],
        innerGroups: [
            {
                id: SectionElementSettingsGroup.SIZE_SETTINGS,
                name: SectionElementSettingsGroup.SIZE_SETTINGS,
                upsertConfig: DEFAULT_UPSERT_CONFIG,
                controls: getSectionElementSizeControls(element),
                headerText: "Настройки размера",
            },
            {
                id: SectionElementSettingsGroup.TEXT_SETTINGS,
                name: SectionElementSettingsGroup.TEXT_SETTINGS,
                upsertConfig: DEFAULT_UPSERT_CONFIG,
                controls: getSectionElementTextControl(element),
                headerText: "Настройки текста",
            },
            {
                id: SectionElementSettingsGroup.STYLE_SETTINGS,
                name: SectionElementSettingsGroup.STYLE_SETTINGS,
                upsertConfig: DEFAULT_UPSERT_CONFIG,
                controls: getSectionElementStyleControl(element),
                headerText: "Настройки стилей",
            },
        ],
    };
}
