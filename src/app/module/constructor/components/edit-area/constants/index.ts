import { InjectionToken, Type } from "@angular/core";
import {
    RootComponent,
    SectionComponent,
    SitePageElementType,
    SitePageElementUnion,
    StyleUnit,
    TitleComponent,
    defaultSectionElementSettings,
} from "@modules/constructor";
import { UpsertConfig } from "@ngneat/forms-manager/lib/types";

export const DEFAULT_UPSERT_CONFIG: UpsertConfig = {
    debounceTime: 500,
};

export const ROOT_ELEMENT_ID = 1;

export const ELEMENT_ID = new InjectionToken<number>("ELEMENT_ID", {
    factory: () => {
        return ROOT_ELEMENT_ID;
    },
});

export const PARENT_ID = new InjectionToken<number>("PARENT_ID");

export const styleUnitMap: Record<StyleUnit, string> = {
    [StyleUnit.PX]: StyleUnit.PX,
    [StyleUnit.PERCENT]: "%",
    [StyleUnit.EM]: StyleUnit.EM,
    [StyleUnit.VH]: StyleUnit.VH,
    [StyleUnit.VW]: StyleUnit.VW,
    [StyleUnit.REM]: StyleUnit.REM,
};

export const sitePageElementMap: Record<SitePageElementType, Type<unknown>> = {
    [SitePageElementType.TITLE]: TitleComponent,
    [SitePageElementType.PAGE]: RootComponent,
    [SitePageElementType.SECTION]: SectionComponent,
};

export const defaultPageElementSettingsMap: Record<SitePageElementType, Omit<SitePageElementUnion, "id" | "parentId">> = {
    [SitePageElementType.TITLE]: {
        type: SitePageElementType.TITLE,
        children: [],
        isExtendable: false,
        settings: {
            width: {
                value: 100,
                unit: StyleUnit.PERCENT,
            },
            height: {
                value: 20,
                unit: StyleUnit.PERCENT,
            },
        },
    },
    [SitePageElementType.SECTION]: defaultSectionElementSettings,
    [SitePageElementType.PAGE]: {
        type: SitePageElementType.PAGE,
        children: [],
        isExtendable: false,
        settings: {
            width: {
                value: 100,
                unit: StyleUnit.PERCENT,
            },
            height: {
                value: 100,
                unit: StyleUnit.PERCENT,
            },
        },
    },
};

export const defaultSizeControlUnit = [
    { label: "%", value: StyleUnit.PERCENT },
    { label: StyleUnit.PX, value: StyleUnit.PX },
];

export const defaultTextControlElement = [
    { label: StyleUnit.PX, value: StyleUnit.PX },
    { label: StyleUnit.EM, value: StyleUnit.EM },
];
