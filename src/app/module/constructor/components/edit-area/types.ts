import { TitleComponent } from "@modules/constructor/components/edit-area/component/title/title.component";
import { Type, ViewContainerRef } from "@angular/core";

export const ROOT_ELEMENT_ID = 1;

export enum SitePageElementType {
    PAGE = "page",
    TITLE = "title",
}

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

export const sitePageElementMap: Record<SitePageElementType, Type<ComponentWithVCR>> = {
    [SitePageElementType.TITLE]: TitleComponent,
    [SitePageElementType.PAGE]: TitleComponent,
};

export interface ComponentWithVCR {
    readonly viewContainerRef: ViewContainerRef;

    readonly container: ViewContainerRef;
}
