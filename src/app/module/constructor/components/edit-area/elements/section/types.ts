import {
    AlignItems,
    ColumnStructure,
    ElementSettingsWithUnit,
    FlexWrap,
    JustifyContent,
    SitePageElement,
    SitePageElementBackground,
    SitePageElementBorder,
    SitePageElementSizeSettings,
    SitePageElementTextColor,
} from "@modules/constructor";
import { Direction, RangeWithUnit } from "@components";

export type SectionPageElement = SitePageElement<SectionPageElementSettings>;

export type SectionPageElementSettings = Readonly<
    {
        tag: string;
        padding: Direction;
        margin: Direction;
        letterSpacing: RangeWithUnit;
        opacity: number;
        isInit: boolean;
        structure?: ColumnStructure;
        gap: ElementSettingsWithUnit;
        justifyContent: JustifyContent;
        flexWrap: FlexWrap;
        alignItems: AlignItems;
    } & SitePageElementSizeSettings &
        SitePageElementTextColor &
        SitePageElementBackground &
        SitePageElementBorder
>;

export type ColumnStructureElement = Readonly<{
    type: ColumnStructure;
    icon: string;
    text: string;
}>;
