import { AccordionItemPageElement, SitePageElement, SitePageElementSizeSettings } from "@modules/constructor";

export type AccordionPageElement = SitePageElement<AccordionPageElementSettings>;

export type AccordionPageElementSettings = Readonly<{
    count: number;
    selectedElement: string;
    items: (AccordionItemPageElement & { id?: string; duplicatedId?: string })[];
}> &
    SitePageElementSizeSettings;
