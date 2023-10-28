import { APFormControl, APFormDefaultTemplateKeys, APFormModel } from "@components";
import {
    DEFAULT_UPSERT_CONFIG,
    ImageElementSettingsGroup,
    ImagePageElement,
    ObjectFit,
    StyleUnit,
    defaultObjectFitItems,
    defaultObjectFitPositionItems,
    defaultSizeControlUnit,
    getDefaultSizeSettings,
} from "@modules/constructor";

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

export function getImageMaxWidthControl(element: ImagePageElement): APFormControl {
    return {
        id: "maxWidth",
        name: "maxWidth",
        value: element.settings.maxWidth,
        valueTemplateKey: APFormDefaultTemplateKeys.NUMBER_WITH_DROPDOWN_FIELD,
        options: {
            label: "Максимальная ширина",
            items: defaultSizeControlUnit,
            selectLabelKey: "label",
            selectValueKey: "value",
            max: element.settings.maxWidth.unit === StyleUnit.PERCENT ? 100 : 1920,
            min: 0,
        },
    };
}

export function getImageObjectFitControl(element: ImagePageElement): APFormControl {
    return {
        id: "objectFit",
        name: "objectFit",
        value: element.settings.objectFit,
        valueTemplateKey: APFormDefaultTemplateKeys.DROPDOWN_FIELD,
        options: {
            label: "Расположение картинки",
            selectLabelKey: "label",
            selectValueKey: "value",
            customClass: "image-fit-control",
            items: defaultObjectFitItems,
        },
    };
}

export function getImageObjectPositionControl(element: ImagePageElement): APFormControl {
    return {
        id: "objectPosition",
        name: "objectPosition",
        value: element.settings.objectPosition,
        valueTemplateKey: APFormDefaultTemplateKeys.DROPDOWN_FIELD,
        options: {
            label: "Позиция картинки",
            selectLabelKey: "label",
            selectValueKey: "value",
            customClass: "image-fit-control",
            items: defaultObjectFitPositionItems,
        },
    };
}

export function getImageElementControls(element: ImagePageElement): APFormControl[] {
    return [
        ...getDefaultSizeSettings(element),
        getImageMaxWidthControl(element),
        getImageObjectFitControl(element),
        element.settings.objectFit !== ObjectFit.DEFAULT && getImageObjectPositionControl(element),
        getImageControl(element),
    ].filter(Boolean) as APFormControl[];
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
