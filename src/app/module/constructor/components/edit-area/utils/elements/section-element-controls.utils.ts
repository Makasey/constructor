import { APFormControl, APFormDefaultTemplateKeys, APFormModel } from "@components/ui";
import { DEFAULT_UPSERT_CONFIG } from "@modules/constructor/components/edit-area/constants";
import { SectionPageElement } from "@modules/constructor/components/edit-area/component/section/types";
import { getDefaultSizeSettings } from "@modules/constructor/components/edit-area/utils/element-size-settings.utils";

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

function getSectionLabelControl(element: SectionPageElement): APFormControl {
    return {
        id: "label",
        name: "label",
        value: element.settings.label ?? null,
        valueTemplateKey: APFormDefaultTemplateKeys.TEXT_FIELD,
        options: {
            maxLength: 300,
            label: "Текст элемента",
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

export function getSectionElementControls(element: SectionPageElement): APFormControl[] {
    return [
        ...getDefaultSizeSettings(element),
        getSectionTextControl(element),
        getSectionLabelControl(element),
        getSectionColorControl(element),
        getSectionBackgroundColorControl(element),
    ];
}

export function getSectionSettings(element: SectionPageElement): APFormModel {
    const controls = getSectionElementControls(element);

    return {
        id: "elementSettings",
        name: "elementSettings",
        upsertConfig: DEFAULT_UPSERT_CONFIG,
        controls: controls,
    };
}
