import { APFormControl, APFormDefaultTemplateKeys, APFormModel } from "@components";
import {
    AccordionElementSettingsGroup,
    AccordionPageElement,
    DEFAULT_UPSERT_CONFIG,
    SitePageElementType,
    defaultPageElementSettingsMap,
    getDefaultSizeSettings,
} from "@modules/constructor";

function getTabsItemsControls(element: AccordionPageElement): APFormControl {
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

function getAccordionElementControls(element: AccordionPageElement): APFormControl[] {
    return [...getDefaultSizeSettings(element), getTabsItemsControls(element)];
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
