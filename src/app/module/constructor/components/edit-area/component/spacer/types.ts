import { Direction } from "@components";
import { SitePageElement, SitePageElementSizeSettings } from "@modules/constructor";

export type SpacerPageElement = SitePageElement<SpacerPageElementSettings>;

export type SpacerPageElementSettings = Readonly<
    {
        padding: Direction;
        margin: Direction;
    } & SitePageElementSizeSettings
>;
