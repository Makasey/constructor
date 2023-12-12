import { APFormControl, APFormDefaultTemplateKeys, APFormModel } from "@components";
import {
    AccordionElementItemSettingsGroup,
    AccordionItemPageElement,
    DEFAULT_UPSERT_CONFIG,
    TabsItemPageElement,
    defaultSizeControlUnit,
} from "@modules/constructor";

function getAccordionItemElementMarginControl(element: TabsItemPageElement): APFormControl {
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

function getAccordionItemPaddingControl(element: TabsItemPageElement): APFormControl {
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

function getAccordionItemElementControls(element: AccordionItemPageElement): APFormControl[] {
    return [getAccordionItemPaddingControl(element), getAccordionItemElementMarginControl(element)];
}

export function getAccordionItemElementSettings(element: AccordionItemPageElement): APFormModel {
    return {
        id: "elementSettings",
        name: "elementSettings",
        upsertConfig: DEFAULT_UPSERT_CONFIG,
        controls: [],
        innerGroups: [
            {
                id: AccordionElementItemSettingsGroup.SIZE_SETTINGS,
                name: AccordionElementItemSettingsGroup.SIZE_SETTINGS,
                upsertConfig: DEFAULT_UPSERT_CONFIG,
                controls: getAccordionItemElementControls(element),
                headerText: "Настройки аккордиона айтема",
            },
        ],
    };
}
