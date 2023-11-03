import { APFormControl, APFormDefaultTemplateKeys, APFormModel } from "@components";
import {
    DEFAULT_UPSERT_CONFIG,
    TitleElementSettingsGroup,
    TitlePageElement,
    defaultTitleTagControls,
    getDefaultSizeSettings,
    linkValidator,
} from "@modules/constructor";

function getTitleTextControl(element: TitlePageElement): APFormControl {
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

function getTitleHTMLTagControl(element: TitlePageElement): APFormControl {
    return {
        id: "tag",
        name: "tag",
        value: element.settings.tag,
        valueTemplateKey: APFormDefaultTemplateKeys.DROPDOWN_FIELD,
        options: {
            selectLabelKey: "label",
            selectValueKey: "value",
            items: defaultTitleTagControls,
            label: "Тип тега",
        },
    };
}

function getTitleColorControl(element: TitlePageElement): APFormControl {
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

function getBackgroundColorControl(element: TitlePageElement): APFormControl {
    return {
        id: "backgroundColor",
        name: "background",
        value: element.settings.background ?? "#ffffff",
        valueTemplateKey: APFormDefaultTemplateKeys.BACKGROUND_FIELD,
        options: {
            label: "Цвет бэкграунда",
        },
    };
}

export function getLinkElementControl(element: TitlePageElement): APFormControl {
    return {
        id: "link",
        name: "link",
        value: element.settings.link ?? "",
        valueTemplateKey: APFormDefaultTemplateKeys.TEXT_FIELD,
        validators: [linkValidator],
        options: {
            label: "Ссылка для текста",
            maxLength: 50,
        },
    };
}

export function getTitleElementSizeControls(element: TitlePageElement): APFormControl[] {
    return [...getDefaultSizeSettings(element)];
}

export function getTitleElementTextControl(element: TitlePageElement): APFormControl[] {
    return [getTitleTextControl(element), getTitleHTMLTagControl(element), getTitleColorControl(element), getLinkElementControl(element)];
}

export function getTitleElementStyleControl(element: TitlePageElement): APFormControl[] {
    return [getBackgroundColorControl(element)];
}

export function getTitleSettings(element: TitlePageElement): APFormModel {
    return {
        id: "elementSettings",
        name: "elementSettings",
        upsertConfig: DEFAULT_UPSERT_CONFIG,
        controls: [],
        innerGroups: [
            {
                id: TitleElementSettingsGroup.SIZE_SETTINGS,
                name: TitleElementSettingsGroup.SIZE_SETTINGS,
                upsertConfig: DEFAULT_UPSERT_CONFIG,
                controls: getTitleElementSizeControls(element),
                headerText: "Настройки размера",
            },
            {
                id: TitleElementSettingsGroup.TEXT_SETTINGS,
                name: TitleElementSettingsGroup.TEXT_SETTINGS,
                upsertConfig: DEFAULT_UPSERT_CONFIG,
                controls: getTitleElementTextControl(element),
                headerText: "Настройки текста",
            },
            {
                id: TitleElementSettingsGroup.STYLE_SETTINGS,
                name: TitleElementSettingsGroup.STYLE_SETTINGS,
                upsertConfig: DEFAULT_UPSERT_CONFIG,
                controls: getTitleElementStyleControl(element),
                headerText: "Настройки стилей",
            },
        ],
    };
}
