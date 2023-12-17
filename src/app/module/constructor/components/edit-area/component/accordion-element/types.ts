import { AccordionItemPageElementSettings, SitePageElement, SitePageElementSizeSettings } from "@modules/constructor";

export type AccordionPageElement = SitePageElement<AccordionPageElementSettings>;

export type AccordionPageElementSettings = Readonly<{
    count: number;
    selectedElement: string;
    items: (AccordionItemPageElementSettings & { id?: string; duplicatedId?: string })[];
}> &
    SitePageElementSizeSettings;
