import {
    CampaignType,
    ImagePageElement,
    InnerPageElement,
    SectionPageElement,
    SitePageElementType,
    StyleUnit,
    TabsItemPageElement,
    TabsPageElement,
    TitlePageElement,
} from "@modules/constructor";
import { File } from "@shared-types";
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

export type CampaignPreviewModel = Readonly<{
    id: string;
    text: string;
}>;
