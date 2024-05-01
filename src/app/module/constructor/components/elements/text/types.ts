import { SitePageElement, SitePageElementBackground, SitePageElementSizeSettings, SitePageElementTextColor } from "@modules/constructor";

export type TextPageElement = SitePageElement<TextPageElementSettings>;

export type TextPageElementSettings = Readonly<
    {
        text?: string;
        label?: string;
    } & SitePageElementSizeSettings &
        SitePageElementTextColor &
        SitePageElementBackground
>;

export enum TextElementSettingsGroup {
    SIZE_SETTINGS = "sizeSettings",
    TEXT_SETTINGS = "textSettings",
    STYLE_SETTINGS = "styleSettings",
}
