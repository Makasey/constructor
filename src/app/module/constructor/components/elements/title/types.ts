import { SitePageElement, SitePageElementBackground, SitePageElementSizeSettings, SitePageElementTextColor } from "@modules/constructor";

export type TitlePageElement = SitePageElement<TitlePageElementSettings>;

export type TitlePageElementSettings = Readonly<
    {
        text?: string;
        label?: string;
        tag?: string;
        link?: string;
    } & SitePageElementSizeSettings &
        SitePageElementTextColor &
        SitePageElementBackground
>;

export enum TitleElementSettingsGroup {
    SIZE_SETTINGS = "sizeSettings",
    TEXT_SETTINGS = "textSettings",
    STYLE_SETTINGS = "styleSettings",
}
