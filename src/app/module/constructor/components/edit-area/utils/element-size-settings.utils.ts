import { APFormControl, APFormDefaultTemplateKeys } from "@components/ui";
import { SitePageElement } from "../../edit-area/types";
import { StyleUnit } from "@modules/constructor/components/edit-area/enums";

export const defaultSizeControlUnit = [
    { label: "%", value: StyleUnit.PERCENT },
    { label: StyleUnit.PX, value: StyleUnit.PX },
];

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
