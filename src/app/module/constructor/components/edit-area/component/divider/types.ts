import { AlignItems, SitePageElement, SitePageElementBackground, SitePageElementBorder, SitePageElementSizeSettings } from "@modules/constructor";
import { BorderFieldModel, Direction } from "@components";

export type DividerPageElement = SitePageElement<DividerPageElementSettings>;

export type DividerPageElementSettings = Readonly<
    {
        padding: Direction;
        margin: Direction;
        text: string;
        lineBorder: BorderFieldModel;
        alignItems: AlignItems;
    } & SitePageElementSizeSettings &
        SitePageElementBackground &
        SitePageElementBorder
>;
