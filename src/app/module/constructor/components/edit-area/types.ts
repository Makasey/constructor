import { CampaignType, SectionPageElement, SitePageElementType, StyleUnit } from "@modules/constructor/components/edit-area";
import { File } from "@shared-types/file/file";
import { Page } from "@core/store/states/ui-states";
import { ViewContainerRef } from "@angular/core";

export type SitePageElementUnion = SectionPageElement | SitePageElement;

export type SitePageElement<T = SitePageElementSettings> = Readonly<{
    id: number;
    parentId: number | null;
    type: SitePageElementType;
    isExtendable: boolean;
    children: number[];
    settings: T;
}>;

export type SitePageElementSizeSettings = Readonly<{
    width: ElementSettingsWithUnit;
    height: ElementSettingsWithUnit;
}>;

export type SitePageElementTextColor = Readonly<{
    color: string;
}>;

export type SitePageElementBackground = Readonly<{
    backgroundColor: string;
}>;

export type SitePageElementSettings = Readonly<
    {
        text?: string;
    } & SitePageElementSizeSettings
>;

export type ElementSettingsWithUnit = Readonly<{
    value: number;
    unit: StyleUnit;
}>;

export type PageSettings = Readonly<{
    title: string;
    campaignName: string;
    logotype: File | null;
    siteMetaTags: string;
    siteDescription: string;
    id?: number;
}>;

export interface ComponentWithVCR {
    readonly viewContainerRef: ViewContainerRef;

    readonly container: ViewContainerRef;
}

export type CampaignModel = Readonly<{
    id: number;
    model: Record<string, SitePageElement>;
    settings: PageSettings;
    type: CampaignType;
    campaignName: string;
}>;

export type CreateCampaignModel = Readonly<{
    type: "page";
    body: {
        pages: Page[];
        elements: Record<string, SitePageElement>;
    };
}>;
