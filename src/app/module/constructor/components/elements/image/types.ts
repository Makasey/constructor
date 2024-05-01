import { ElementSettingsWithUnit, ObjectFit, ObjectFitPosition, SitePageElement, SitePageElementSizeSettings } from "@modules/constructor";
import { File } from "@shared-types";

export type ImagePageElement = SitePageElement<ImagePageElementSettings>;

export type ImagePageElementSettings = Readonly<{
    image: File;
    maxWidth: ElementSettingsWithUnit;
    objectFit: ObjectFit;
    objectPosition: ObjectFitPosition;
}> &
    SitePageElementSizeSettings;
