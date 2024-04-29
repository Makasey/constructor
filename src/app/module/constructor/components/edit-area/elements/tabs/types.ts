import { SitePageElement, SitePageElementSizeSettings, TabsItemPageElementSettings } from "@modules/constructor";

export type TabsPageElement = SitePageElement<TabsPageElementSettings>;

export type TabsPageElementSettings = Readonly<{
    count: number;
    selectedElement: string;
    items: (TabsItemPageElementSettings & { id?: string; duplicatedId?: string })[];
}> &
    SitePageElementSizeSettings;
