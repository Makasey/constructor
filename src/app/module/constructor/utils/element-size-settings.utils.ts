import { APFormControl, APFormDefaultTemplateKeys } from "@components";
import { SitePageElement, defaultSizeControlUnit } from "@modules/constructor";

function getDefaultHeightControl(element: SitePageElement): APFormControl {
    return {
        id: "height",
        name: "height",
        value: element.settings.height,
        valueTemplateKey: APFormDefaultTemplateKeys.NUMBER_WITH_DROPDOWN_FIELD,
        options: {
            max: 1920,
            selectLabelKey: "label",
            selectValueKey: "value",
            items: defaultSizeControlUnit,
            label: "Высота элемента",
        },
    };
}

function getDefaultWidthControl(element: SitePageElement): APFormControl {
    return {
        id: "width",
        name: "width",
        value: element.settings.width,
        valueTemplateKey: APFormDefaultTemplateKeys.NUMBER_WITH_DROPDOWN_FIELD,
        options: {
            max: 1920,
            selectLabelKey: "label",
            selectValueKey: "value",
            items: defaultSizeControlUnit,
            label: "Ширина элемента",
        },
    };
}

export function getDefaultSizeSettings<T extends SitePageElement>(element: T): APFormControl[] {
    return [getDefaultWidthControl(element), getDefaultHeightControl(element)];
}
