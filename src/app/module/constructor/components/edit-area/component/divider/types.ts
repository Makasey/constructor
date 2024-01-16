import {
    AlignItems,
    BorderType,
    SitePageElement,
    SitePageElementBackground,
    SitePageElementBorder,
    SitePageElementSizeSettings,
} from "@modules/constructor";
import { Direction } from "@components";

export type DividerPageElement = SitePageElement<DividerPageElementSettings>;

export type DividerPageElementSettings = Readonly<
    {
        padding: Direction;
        margin: Direction;
        text: string;
        lineBorderType: BorderType;
        alignItems: AlignItems;
    } & SitePageElementSizeSettings &
        SitePageElementBackground &
        SitePageElementBorder
>;
