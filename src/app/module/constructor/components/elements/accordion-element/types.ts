import { AccordionItemPageElementSettings, SitePageElement, SitePageElementSizeSettings } from "@modules/constructor";
import { Direction } from "@components";

export type AccordionPageElement = SitePageElement<AccordionPageElementSettings>;

export type AccordionPageElementSettings = Readonly<{
    count: number;
    selectedElement: string;
    padding: Direction;
    margin: Direction;
    items: (AccordionItemPageElementSettings & { id?: string; duplicatedId?: string })[];
}> &
    SitePageElementSizeSettings;
