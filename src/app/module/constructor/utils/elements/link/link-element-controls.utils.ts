import { APFormControl, APFormDefaultTemplateKeys, APFormModel } from "@components";
import { DEFAULT_UPSERT_CONFIG, LinkPageElement, defaultLinkTargetControls, linkValidator } from "@modules/constructor";

function getLinkBackgroundColorControl(element: LinkPageElement): APFormControl {
    return {
        id: "background",
        name: "background",
        value: element.settings.background ?? "#ffffff",
        valueTemplateKey: APFormDefaultTemplateKeys.BACKGROUND_FIELD,
        options: {
            label: "Цвет бэкграунда",
        },
    };
}

function getLinkTextControl(element: LinkPageElement): APFormControl {
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

function getLinkColorControl(element: LinkPageElement): APFormControl {
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

function getLinkLinkElementControl(element: LinkPageElement): APFormControl {
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

function getLinkElementTargetSettings(element: LinkPageElement): APFormControl {
    return {
        id: "target",
        name: "target",
        value: element.settings.target,
        valueTemplateKey: APFormDefaultTemplateKeys.DROPDOWN_FIELD,
        options: {
            label: "Переход по ссылке",
            selectLabelKey: "label",
            selectValueKey: "value",
            items: defaultLinkTargetControls,
        },
    };
}

function getLinkElementSettingsControls(element: LinkPageElement): APFormControl[] {
    return [
        getLinkTextControl(element),
        getLinkLinkElementControl(element),
        getLinkElementTargetSettings(element),
        getLinkBackgroundColorControl(element),
        getLinkColorControl(element),
    ];
}

export function getLinkElementSettings(element: LinkPageElement): APFormModel {
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
                controls: getLinkElementSettingsControls(element),
                headerText: "Настройки элемента ссылкуи",
            },
        ],
    };
}
