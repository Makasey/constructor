import { APFormControl, APFormDefaultTemplateKeys, APFormModel } from "@components";
import { DEFAULT_UPSERT_CONFIG, ImageElementSettingsGroup, ImagePageElement, getDefaultSizeSettings } from "@modules/constructor";

export function getImageControl(element: ImagePageElement): APFormControl {
    return {
        id: "image",
        name: "image",
        value: element.settings.image,
        valueTemplateKey: APFormDefaultTemplateKeys.IMAGE_UPLOAD_FIELD,
        options: {
            label: "Картинка",
            maxLength: 50,
            minLength: 3,
        },
    };
}

export function getImageElementControls(element: ImagePageElement): APFormControl[] {
    return [...getDefaultSizeSettings(element), getImageControl(element)];
}

export function getImageSettings(element: ImagePageElement): APFormModel {
    return {
        id: "elementSettings",
        name: "elementSettings",
        upsertConfig: DEFAULT_UPSERT_CONFIG,
        controls: [],
        innerGroups: [
            {
                id: ImageElementSettingsGroup.STYLE_SETTINGS,
                name: ImageElementSettingsGroup.STYLE_SETTINGS,
                upsertConfig: DEFAULT_UPSERT_CONFIG,
                controls: getImageElementControls(element),
                headerText: "Настройки изображения",
            },
        ],
    };
}
