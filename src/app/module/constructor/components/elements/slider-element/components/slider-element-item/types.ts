import { SitePageElement, SitePageElementBackground, SitePageElementSizeSettings } from "@modules/constructor";

export type SliderItemPageElement = SitePageElement<SliderPageElementItemSettings>;

export type SliderPageElementItemSettings = Readonly<{
    title?: string;
}> &
    SitePageElementSizeSettings &
    SitePageElementBackground;
