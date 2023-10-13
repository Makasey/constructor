import { File } from "@shared-types";
import {
    ImagePageElement,
    InnerPageElement,
    SectionPageElement,
    SitePageElementType,
    StyleUnit,
    TabsItemPageElement,
    TabsPageElement,
    TitlePageElement,
} from "@modules/constructor";
import { Page } from "@core";
import { ViewContainerRef } from "@angular/core";

export type SitePageElementUnion =
    | TabsItemPageElement
    | SectionPageElement
    | SitePageElement
    | TitlePageElement
    | InnerPageElement
    | ImagePageElement
    | TabsPageElement;

export type SitePageElement<T = SitePageElementSettings> = Readonly<{
    id: string;
    parentId: string | null;
    type: SitePageElementType;
    isExtendable: boolean;
    children: string[];
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
    logotype: File | null;
    siteMetaTags: string;
    siteDescription: string;
}>;

export interface ComponentWithVCR {
    readonly viewContainerRef: ViewContainerRef;

    readonly container: ViewContainerRef;
}

export type CampaignModel = Readonly<{
    id: number;
    elements: Record<string, SitePageElement>;
    campaignName: string;
    pages: Page[];
}>;

export type CreateCampaignModel = Readonly<{
    pages: Page[];
    elements: Record<string, SitePageElement>;
    campaignName: string;
}>;

export type CreatePreviewModel = Readonly<{
    type: "page";
    body: {
        pages: Page[];
        elements: Record<string, SitePageElement>;
    };
}>;

export type CampaignPreviewModel = Readonly<{
    id: string;
    text: string;
    name: string;
}>;
