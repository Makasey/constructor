import { APFormControl, APFormDefaultTemplateKeys, APFormModel } from "@components";
import {
    DEFAULT_UPSERT_CONFIG,
    SitePageElementType,
    SliderElementSettingsGroup,
    SliderPageElement,
    defaultAutoSlideItems,
    defaultPageElementSettingsMap,
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
            defaultItemFn: () => defaultPageElementSettingsMap[SitePageElementType.SLIDER_ITEM]().settings,
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

function getSliderElementGapItemsControl(element: SliderPageElement): APFormControl {
    return {
        id: "gap",
        name: "gap",
        value: element.settings.gap,
        valueTemplateKey: APFormDefaultTemplateKeys.NUMBER_FIELD,
        options: {
            label: "Gap элементов",
        },
    };
}

function getSectionAutoSlideControl(element: SliderPageElement): APFormControl {
    return {
        id: "autoSlide",
        name: "autoSlide",
        value: element.settings.autoSlide,
        valueTemplateKey: APFormDefaultTemplateKeys.RADIO_GROUP_FIELD,
        options: {
            label: "Авто слайд",
            items: defaultAutoSlideItems,
        },
    };
}

function getSliderAutoSlideTimeoutControl(element: SliderPageElement): APFormControl {
    return {
        id: "autoSlideTimeout",
        name: "autoSlideTimeout",
        value: element.settings.autoSlideTimeout,
        valueTemplateKey: APFormDefaultTemplateKeys.NUMBER_FIELD,
        options: {
            label: "Время прокрутки",
            min: 1000,
        },
    };
}

function getSliderElementSettingsControls(element: SliderPageElement): APFormControl[] {
    return [
        ...getDefaultSizeSettings(element),
        getSliderElementShowItemsControl(element),
        getSliderElementScrollingItemsControl(element),
        getSliderElementGapItemsControl(element),
        getSectionAutoSlideControl(element),
        getSliderAutoSlideTimeoutControl(element),
        getSliderElementItemsControls(element),
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
