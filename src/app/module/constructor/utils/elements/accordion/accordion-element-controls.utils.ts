import { APFormControl, APFormDefaultTemplateKeys, APFormModel } from "@components";
import {
    AccordionElementSettingsGroup,
    AccordionPageElement,
    DEFAULT_UPSERT_CONFIG,
    SitePageElementType,
    defaultPageElementSettingsMap,
    defaultSizeControlUnit,
    getDefaultSizeSettings,
} from "@modules/constructor";

function getAccordionItemsControls(element: AccordionPageElement): APFormControl {
    return {
        id: "items",
        name: "items",
        value: element.settings.items,
        valueTemplateKey: APFormDefaultTemplateKeys.ITEMS_CONTROL_FIELD,
        options: {
            label: "Элементы",
            defaultItemFn: () => defaultPageElementSettingsMap[SitePageElementType.ACCORDION_ITEM]().settings,
        },
    };
}

function getAccordionPaddingControl(element: AccordionPageElement): APFormControl {
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

function getAccordionMarginControl(element: AccordionPageElement): APFormControl {
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

function getAccordionElementControls(element: AccordionPageElement): APFormControl[] {
    return [
        ...getDefaultSizeSettings(element),
        getAccordionPaddingControl(element),
        getAccordionMarginControl(element),
        getAccordionItemsControls(element),
    ];
}

export function getAccordionElementSettings(element: AccordionPageElement): APFormModel {
    return {
        id: "elementSettings",
        name: "elementSettings",
        upsertConfig: DEFAULT_UPSERT_CONFIG,
        controls: [],
        innerGroups: [
            {
                id: AccordionElementSettingsGroup.STYLE_SETTINGS,
                name: AccordionElementSettingsGroup.STYLE_SETTINGS,
                upsertConfig: DEFAULT_UPSERT_CONFIG,
                controls: getAccordionElementControls(element),
                headerText: "Настройки аккордиона",
            },
        ],
    };
}
