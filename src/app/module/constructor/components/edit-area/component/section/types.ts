import {
    SitePageElement,
    SitePageElementBackground,
    SitePageElementSizeSettings,
    SitePageElementTextColor,
} from "@modules/constructor/components/edit-area/types";

export type SectionPageElement = SitePageElement<SectionPageElementSettings>;

export type SectionPageElementSettings = Readonly<
    {
        text?: string;
        label?: string;
    } & SitePageElementSizeSettings &
        SitePageElementTextColor &
        SitePageElementBackground
>;
