import { Direction } from "@components";
import { SitePageElement, SitePageElementBackground, SitePageElementSizeSettings } from "@modules/constructor";

export type AccordionItemPageElement = SitePageElement<AccordionItemPageElementSettings>;

export type AccordionItemPageElementSettings = Readonly<{
    margin: Direction;
    padding: Direction;
    title?: string;
}> &
    SitePageElementSizeSettings &
    SitePageElementBackground;
