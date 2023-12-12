import { Direction } from "@components";
import { SitePageElement, SitePageElementSizeSettings } from "@modules/constructor";

export type AccordionItemPageElement = SitePageElement<AccordionItemPageElementSettings>;

export type AccordionItemPageElementSettings = Readonly<{
    margin: Direction;
    padding: Direction;
    title?: string;
}> &
    SitePageElementSizeSettings;
