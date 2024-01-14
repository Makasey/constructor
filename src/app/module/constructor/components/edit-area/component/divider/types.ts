import { Direction } from "@components";
import { SitePageElement, SitePageElementBackground, SitePageElementBorder, SitePageElementSizeSettings } from "@modules/constructor";

export type DividerPageElement = SitePageElement<DividerPageElementSettings>;

export type DividerPageElementSettings = Readonly<
    {
        padding: Direction;
        margin: Direction;
        text: string;
    } & SitePageElementSizeSettings &
        SitePageElementBackground &
        SitePageElementBorder
>;
