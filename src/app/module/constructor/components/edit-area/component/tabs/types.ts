import { SitePageElement, SitePageElementSizeSettings } from "@modules/constructor";

export type TabsPageElement = SitePageElement<TabsPageElementSettings>;

export type TabsPageElementSettings = Readonly<{
    count: number;
    selectedElement: string;
}> &
    SitePageElementSizeSettings;
