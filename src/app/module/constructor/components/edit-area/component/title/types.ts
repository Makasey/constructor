import {
    SitePageElement,
    SitePageElementBackground,
    SitePageElementSizeSettings,
    SitePageElementTextColor,
} from "@modules/constructor/components/edit-area/types";

export type TitlePageElement = SitePageElement<TitlePageElementSettings>;

export type TitlePageElementSettings = Readonly<
    {
        text?: string;
        label?: string;
    } & SitePageElementSizeSettings &
        SitePageElementTextColor &
        SitePageElementBackground
>;

export enum TitleElementSettingsGroup {
    SIZE_SETTINGS = "sizeSettings",
    TEXT_SETTINGS = "textSettings",
    STYLE_SETTINGS = "styleSettings",
}
