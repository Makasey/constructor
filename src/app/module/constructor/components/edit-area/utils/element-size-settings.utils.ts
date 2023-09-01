import { APFormControl, APFormDefaultTemplateKeys } from "@components/ui";
import { SitePageElement } from "@modules/constructor/components/edit-area/types";

function getDefaultHeightControl(element: SitePageElement): APFormControl {
    return {
        id: "height",
        name: "height",
        value: element.settings.height.value,
        valueTemplateKey: APFormDefaultTemplateKeys.NUMBER_FIELD,
        options: {
            max: 1920,
            label: "Высота элемента",
        },
    };
}

function getDefaultWidthControl(element: SitePageElement): APFormControl {
    return {
        id: "width",
        name: "width",
        value: element.settings.width.value,
        valueTemplateKey: APFormDefaultTemplateKeys.NUMBER_FIELD,
        options: {
            max: 1920,
            label: "Ширина элемента",
        },
    };
}

export function getDefaultSizeSettings<T extends SitePageElement>(element: T): APFormControl[] {
    return [getDefaultWidthControl(element), getDefaultHeightControl(element)];
}
