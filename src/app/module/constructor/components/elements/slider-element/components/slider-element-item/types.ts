import { Direction } from "@components";
import { SitePageElement, SitePageElementBackground, SitePageElementSizeSettings } from "@modules/constructor";

export type SliderItemPageElement = SitePageElement<SliderPageElementItemSettings>;

export type SliderPageElementItemSettings = Readonly<{
    margin: Direction;
    padding: Direction;
}> &
    SitePageElementSizeSettings &
    SitePageElementBackground;
