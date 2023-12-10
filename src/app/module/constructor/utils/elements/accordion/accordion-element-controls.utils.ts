import { APFormControl, APFormModel } from "@components";
import { AccordionElementSettingsGroup, AccordionPageElement, DEFAULT_UPSERT_CONFIG, getDefaultSizeSettings } from "@modules/constructor";

function getAccordionElementControls(element: AccordionPageElement): APFormControl[] {
    return [...getDefaultSizeSettings(element)];
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
