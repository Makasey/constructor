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

export function getSectionElementControls(element: SectionPageElement): APFormControl[] {
    return [...getDefaultSizeSettings(element), getSectionTextControl(element), getSectionLabelControl(element)];
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
