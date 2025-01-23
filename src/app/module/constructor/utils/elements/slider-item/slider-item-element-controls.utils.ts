import { APFormControl, APFormDefaultTemplateKeys, APFormModel } from "@components";
import { DEFAULT_UPSERT_CONFIG, SliderItemPageElement } from "@modules/constructor";

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
    return [getSliderItemColorControl(element)];
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
