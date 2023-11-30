import { Direction } from "@components";
import { SitePageElement, SitePageElementBackground, SitePageElementSizeSettings } from "@modules/constructor";

export type SpacerPageElement = SitePageElement<SpacerPageElementSettings>;

export type SpacerPageElementSettings = Readonly<
    {
        padding: Direction;
        margin: Direction;
    } & SitePageElementSizeSettings &
        SitePageElementBackground
>;
