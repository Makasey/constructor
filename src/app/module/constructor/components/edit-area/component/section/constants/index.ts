import { DirectionController } from "@components/ui/controls/direction-field/types";
import { ElementHTMLTag, StyleUnit } from "@modules/constructor/components/edit-area/enums";

export const defaultSectionTagControls = [
    { label: ElementHTMLTag.SECTION, value: ElementHTMLTag.SECTION },
    { label: ElementHTMLTag.DIV, value: ElementHTMLTag.DIV },
    { label: ElementHTMLTag.ARTICLE, value: ElementHTMLTag.ARTICLE },
];

export const DEFAULT_DIRECTION_CONTROLLER_VALUE: DirectionController = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    unit: StyleUnit.PX,
};
