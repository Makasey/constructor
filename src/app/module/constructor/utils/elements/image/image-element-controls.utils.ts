import { APFormControl, APFormDefaultTemplateKeys, APFormModel } from "@components";
import { DEFAULT_UPSERT_CONFIG, ImageElementSettingsGroup, ImagePageElement, getDefaultSizeSettings } from "@modules/constructor";
import { File } from "@shared-types";

export function getImageTitleControl(element: ImagePageElement): APFormControl {
    return {
        id: "title",
        name: "title",
        value: element.settings.title,
        valueTemplateKey: APFormDefaultTemplateKeys.TEXT_FIELD,
        options: {
            label: "Title",
        },
    };
}

export function getImageAltControl(element: ImagePageElement): APFormControl {
    return {
        id: "alt",
        name: "alt",
        value: element.settings.alt,
        valueTemplateKey: APFormDefaultTemplateKeys.TEXT_FIELD,
        options: {
            label: "ALT",
        },
    };
}

export function getImageSrcControl(element: ImagePageElement): APFormControl {
    return {
        id: "src",
        name: "image",
        value: element.settings.image,
        valueTemplateKey: APFormDefaultTemplateKeys.FILE_UPLOAD,
        options: {
            label: "SRC",
        },
    };
}

export function getImageElementControls(element: ImagePageElement): APFormControl[] {
    return [...getDefaultSizeSettings(element), getImageTitleControl(element), getImageAltControl(element), getImageSrcControl(element)];
}

function processImageSettings(data: unknown): unknown {
    const { image, alt, title } = data as { image: File; alt: string; title: string };

    return {
        image: {
            ...image,
        },
        title: title || image.title,
        alt: alt || image.alt,
    };
}

export function getImageSettings(element: ImagePageElement): APFormModel {
    return {
        id: "elementSettings",
        name: "elementSettings",
        upsertConfig: DEFAULT_UPSERT_CONFIG,
        mapperFn: processImageSettings,
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
