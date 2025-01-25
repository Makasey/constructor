import { ElementSettingsWithUnit, SitePageElement } from "@modules/constructor";
import { File } from "@shared-types";

export type RootElementSettings = Readonly<{
    title: string;
    logotype: File | null;
    siteMetaTags: string;
    siteDescription: string;
    width: ElementSettingsWithUnit;
    height: ElementSettingsWithUnit;
}>;

export type RootElement = SitePageElement<RootElementSettings>;
