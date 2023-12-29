import { APFormControl, APFormDefaultTemplateKeys, APFormModel } from "@components";
import { AccordionElementItemSettingsGroup, AccordionItemPageElement, DEFAULT_UPSERT_CONFIG } from "@modules/constructor";

function getAccordionBackgroundColorControl(element: AccordionItemPageElement): APFormControl {
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

function getAccordionItemElementControls(element: AccordionItemPageElement): APFormControl[] {
    return [getAccordionBackgroundColorControl(element)];
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
