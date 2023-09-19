import { Direction } from "@components/ui/controls/direction-field/types";
import { RangeWithUnit } from "@components/ui/controls/range-with-unit-field/types";
import {
    SitePageElement,
    SitePageElementBackground,
    SitePageElementSizeSettings,
    SitePageElementTextColor,
} from "@modules/constructor/components/edit-area/types";

export type SectionPageElement = SitePageElement<SectionPageElementSettings>;

export type SectionPageElementSettings = Readonly<
    {
        text?: string;
        label?: string;
        tag?: string;
        padding?: Direction;
        margin?: Direction;
        letterSpacing?: RangeWithUnit;
        opacity?: number;
    } & SitePageElementSizeSettings &
        SitePageElementTextColor &
        SitePageElementBackground
>;

export enum SectionElementSettingsGroup {
    SIZE_SETTINGS = "sizeSettings",
    TEXT_SETTINGS = "textSettings",
    STYLE_SETTINGS = "styleSettings",
}
