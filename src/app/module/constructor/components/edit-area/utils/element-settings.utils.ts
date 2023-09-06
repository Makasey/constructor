import { APFormModel } from "@components/ui";
import { SectionPageElement } from "@modules/constructor/components/edit-area/component/section/types";
import { SitePageElementType, SitePageElementUnion } from "@modules/constructor/components/edit-area/types";
import { getSectionSettings } from "./elements";

export function processElementSettings<T extends SitePageElementUnion>(type: SitePageElementType, element: T): APFormModel {
    switch (type) {
        case SitePageElementType.SECTION: {
            return getSectionSettings(element as SectionPageElement);
        }

        case SitePageElementType.PAGE: {
            return getSectionSettings(element as SectionPageElement);
        }

        case SitePageElementType.TITLE: {
            return getSectionSettings(element as SectionPageElement);
        }
    }
}
