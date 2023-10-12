import { Direction } from "@components";
import { SitePageElement, SitePageElementSizeSettings } from "@modules/constructor";

export type TabsItemPageElement = SitePageElement<TabsItemPageElementSettings>;

export type TabsItemPageElementSettings = Readonly<{
    margin: Direction;
    padding: Direction;
}> &
    SitePageElementSizeSettings;
