import { APFormControl, APFormDefaultTemplateKeys } from "@components/ui";
import { SitePageElement, StyleUnit } from "@modules/constructor/components/edit-area/types";

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
            items: [
                { label: "%", value: StyleUnit.PERCENT },
                { label: StyleUnit.PX, value: StyleUnit.PX },
            ],
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
            items: [
                { label: "%", value: StyleUnit.PERCENT },
                { label: StyleUnit.PX, value: StyleUnit.PX },
            ],
            label: "Ширина элемента",
        },
    };
}

export function getDefaultSizeSettings<T extends SitePageElement>(element: T): APFormControl[] {
    return [getDefaultWidthControl(element), getDefaultHeightControl(element)];
}
