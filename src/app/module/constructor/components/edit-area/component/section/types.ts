import { Direction, RangeWithUnit } from "@components";
import { SitePageElement, SitePageElementBackground, SitePageElementSizeSettings, SitePageElementTextColor } from "@modules/constructor";

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
