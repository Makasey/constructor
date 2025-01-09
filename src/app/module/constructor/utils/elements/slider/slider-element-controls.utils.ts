import { APFormControl, APFormDefaultTemplateKeys, APFormModel } from "@components";
import {
    DEFAULT_UPSERT_CONFIG,
    SitePageElementType,
    SliderElementSettingsGroup,
    SliderPageElement,
    defaultPageElementSettingsMap,
    defaultSizeControlUnit,
    getDefaultSizeSettings,
} from "@modules/constructor";

function getSliderElementItemsControls(element: SliderPageElement): APFormControl {
    return {
        id: "items",
        name: "items",
        value: element.settings.items,
        valueTemplateKey: APFormDefaultTemplateKeys.ITEMS_CONTROL_FIELD,
        options: {
            label: "Элементы",
            defaultItemFn: () => defaultPageElementSettingsMap[SitePageElementType.SLIDER]().settings,
        },
    };
}

function getSliderElementShowItemsControl(element: SliderPageElement): APFormControl {
    return {
        id: "showItemsCount",
        name: "showItemsCount",
        value: element.settings.showItemsCount,
        valueTemplateKey: APFormDefaultTemplateKeys.NUMBER_FIELD,
        options: {
            label: "Количество показываемых элементов",
        },
    };
}

function getSliderElementScrollingItemsControl(element: SliderPageElement): APFormControl {
    return {
        id: "scrollingItemsCount",
        name: "scrollingItemsCount",
        value: element.settings.scrollingItemsCount,
        valueTemplateKey: APFormDefaultTemplateKeys.NUMBER_FIELD,
        options: {
            label: "Количество прокручиваемых элементов",
        },
    };
}

function getSliderPaddingControl(element: SliderPageElement): APFormControl {
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

function getAccordionMarginControl(element: SliderPageElement): APFormControl {
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

function getSliderElementSettingsControls(element: SliderPageElement): APFormControl[] {
    return [
        ...getDefaultSizeSettings(element),
        getSliderPaddingControl(element),
        getAccordionMarginControl(element),
        getSliderElementItemsControls(element),
        getSliderElementShowItemsControl(element),
        getSliderElementScrollingItemsControl(element),
    ];
}

export function getSliderElementSettings(element: SliderPageElement): APFormModel {
    return {
        id: "elementSettings",
        name: "elementSettings",
        upsertConfig: DEFAULT_UPSERT_CONFIG,
        controls: [],
        innerGroups: [
            {
                id: SliderElementSettingsGroup.STYLE_SETTINGS,
                name: SliderElementSettingsGroup.STYLE_SETTINGS,
                upsertConfig: DEFAULT_UPSERT_CONFIG,
                controls: getSliderElementSettingsControls(element),
                headerText: "Настройки слайдера",
            },
        ],
    };
}
