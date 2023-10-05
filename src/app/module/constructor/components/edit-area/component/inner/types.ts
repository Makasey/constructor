import {
    ColumnStructure,
    ElementSettingsWithUnit,
    JustifyContent,
    SitePageElement,
    SitePageElementBackground,
    SitePageElementSizeSettings,
    SitePageElementTextColor,
} from "@modules/constructor";
import { Direction, RangeWithUnit } from "@components";

export type InnerPageElement = SitePageElement<InnerPageElementSettings>;

export type InnerPageElementSettings = Readonly<
    {
        text?: string;
        label?: string;
        tag?: string;
        padding?: Direction;
        margin?: Direction;
        letterSpacing?: RangeWithUnit;
        opacity?: number;
        isInit?: boolean;
        structure?: ColumnStructure;
        gap?: ElementSettingsWithUnit;
        justifyContent?: JustifyContent;
    } & SitePageElementSizeSettings &
        SitePageElementTextColor &
        SitePageElementBackground
>;
