import { InjectionToken, Type, ViewContainerRef } from "@angular/core";
import { RootComponent } from "@modules/constructor/components/edit-area/component/root/root.component";
import { SectionComponent } from "@modules/constructor/components/edit-area/component/section/section.component";
import { TitleComponent } from "@modules/constructor/components/edit-area/component/title/title.component";

export const ROOT_ELEMENT_ID = 1;

export enum SitePageElementType {
    PAGE = "page",
    TITLE = "title",
    SECTION = "section",
}

export const ELEMENT_ID = new InjectionToken("ELEMENT_ID");

export type SitePageElement = Readonly<{
    id: number;
    type: SitePageElementType;
    isExtendable: boolean;
    children: number[];
    settings: SitePageElementSettings;
}>;

export type SitePageElementSettings = Readonly<{
    width: number;
    height: number;
    text?: string;
}>;

export type PageSettings = Readonly<{
    title: string;
    campaignName: string;
    id?: number;
}>;

export const sitePageElementMap: Record<SitePageElementType, Type<unknown>> = {
    [SitePageElementType.TITLE]: TitleComponent,
    [SitePageElementType.PAGE]: RootComponent,
    [SitePageElementType.SECTION]: SectionComponent,
};

export const defaultPageElementSettingsMap: Record<SitePageElementType, Omit<SitePageElement, "id">> = {
    [SitePageElementType.TITLE]: {
        type: SitePageElementType.TITLE,
        children: [],
        isExtendable: false,
        settings: {
            width: 200,
            height: 20,
        },
    },
    [SitePageElementType.SECTION]: {
        type: SitePageElementType.SECTION,
        children: [],
        isExtendable: false,
        settings: {
            width: 200,
            height: 20,
        },
    },
    [SitePageElementType.PAGE]: {
        type: SitePageElementType.PAGE,
        children: [],
        isExtendable: false,
        settings: {
            width: 200,
            height: 20,
        },
    },
};

export interface ComponentWithVCR {
    readonly viewContainerRef: ViewContainerRef;

    readonly container: ViewContainerRef;
}
