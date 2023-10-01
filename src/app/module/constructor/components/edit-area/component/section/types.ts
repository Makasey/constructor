import {
    ColumnStructure,
    SitePageElement,
    SitePageElementBackground,
    SitePageElementSizeSettings,
    SitePageElementTextColor,
} from "@modules/constructor";
import { Direction, RangeWithUnit } from "@components";

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
        isInit?: boolean;
        structure?: ColumnStructure;
    } & SitePageElementSizeSettings &
        SitePageElementTextColor &
        SitePageElementBackground
>;

export type ColumnStructureElement = Readonly<{
    type: ColumnStructure;
    icon: string;
    text: string;
}>;
