import { SitePageElement, SitePageElementSizeSettings } from "@modules/constructor";

export type AccordionPageElement = SitePageElement<AccordionPageElementSettings>;

export type AccordionPageElementSettings = Readonly<{
    count: number;
    selectedElement: string;
    items: unknown;
}> &
    SitePageElementSizeSettings;
