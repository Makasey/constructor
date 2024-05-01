import { Direction, RangeWithUnit } from "@components";
import {
    ElementSettingsWithUnit,
    JustifyContent,
    SitePageElement,
    SitePageElementBackground,
    SitePageElementSizeSettings,
    SitePageElementTextColor,
} from "@modules/constructor";

export type InnerPageElement = SitePageElement<InnerPageElementSettings>;

export type InnerPageElementSettings = Readonly<
    {
        tag: string;
        padding: Direction;
        margin: Direction;
        letterSpacing: RangeWithUnit;
        opacity: number;
        gap: ElementSettingsWithUnit;
        justifyContent: JustifyContent;
    } & SitePageElementSizeSettings &
        SitePageElementTextColor &
        SitePageElementBackground
>;
