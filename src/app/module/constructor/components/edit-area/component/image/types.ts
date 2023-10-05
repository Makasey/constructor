import { File } from "@shared-types";
import { SitePageElement, SitePageElementSizeSettings } from "@modules/constructor";

export type ImagePageElement = SitePageElement<ImagePageElementSettings>;

export type ImagePageElementSettings = Readonly<{
    image: File;
    title: string;
    alt: string;
}> &
    SitePageElementSizeSettings;
