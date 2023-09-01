import { APFormModel } from "@components/ui";
import { SitePageElement, SitePageElementType } from "@modules/constructor/components/edit-area/types";
import { getSectionSettings } from "./elements";

export function processElementSettings<T extends SitePageElement>(type: SitePageElementType, element: T): APFormModel {
    switch (type) {
        case SitePageElementType.SECTION: {
            return getSectionSettings(element);
        }

        case SitePageElementType.PAGE: {
            return getSectionSettings(element);
        }

        case SitePageElementType.TITLE: {
            return getSectionSettings(element);
        }
    }
}
