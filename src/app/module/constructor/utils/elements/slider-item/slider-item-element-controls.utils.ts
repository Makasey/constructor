import { APFormControl, APFormDefaultTemplateKeys, APFormModel } from "@components";
import { DEFAULT_UPSERT_CONFIG, SliderItemPageElement, defaultSizeControlUnit, getDefaultSizeSettings } from "@modules/constructor";

function getSliderItemPaddingControl(element: SliderItemPageElement): APFormControl {
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

function getSliderItemMarginControl(element: SliderItemPageElement): APFormControl {
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

function getSliderItemColorControl(element: SliderItemPageElement): APFormControl {
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

function getSliderItemSettingsControls(element: SliderItemPageElement): APFormControl[] {
    return [
        ...getDefaultSizeSettings(element),
        getSliderItemPaddingControl(element),
        getSliderItemMarginControl(element),
        getSliderItemColorControl(element),
    ];
}

export function getSliderItemElementSettings(element: SliderItemPageElement): APFormModel {
    return {
        id: "elementSettings",
        name: "elementSettings",
        upsertConfig: DEFAULT_UPSERT_CONFIG,
        controls: [],
        innerGroups: [
            {
                id: "styleSettings",
                name: "styleSettings",
                upsertConfig: DEFAULT_UPSERT_CONFIG,
                controls: getSliderItemSettingsControls(element),
                headerText: "Настройки елемента слайдера",
            },
        ],
    };
}
