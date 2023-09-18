import { APFormControl, APFormDefaultTemplateKeys, APFormModel } from "@components/ui";
import { DEFAULT_UPSERT_CONFIG } from "@modules/constructor/components/edit-area/constants";
import { TitleElementSettingsGroup, TitlePageElement } from "@modules/constructor/components/edit-area/component/title/types";
import { defaultTitleTagControls } from "@modules/constructor/components/edit-area/component/title/constants";
import { getDefaultSizeSettings } from "@modules/constructor/components/edit-area/utils/element-size-settings.utils";

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

function getTitleBackgroundColorControl(element: TitlePageElement): APFormControl {
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

export function getTitleElementSizeControls(element: TitlePageElement): APFormControl[] {
    return [...getDefaultSizeSettings(element)];
}

export function getTitleElementTextControl(element: TitlePageElement): APFormControl[] {
    return [getTitleTextControl(element), getTitleHTMLTagControl(element), getTitleColorControl(element)];
}

export function getTitleElementStyleControl(element: TitlePageElement): APFormControl[] {
    return [getTitleBackgroundColorControl(element)];
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
