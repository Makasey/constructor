import {
    AccordionItemPageElement,
    AccordionPageElement,
    ElementActionType,
    ImagePageElement,
    ImagePageElementSettings,
    InnerPageElement,
    InnerPageElementSettings,
    LinkPageElement,
    SectionPageElement,
    SectionPageElementSettings,
    SitePageElementType,
    SliderItemPageElement,
    SliderPageElement,
    SpacerPageElement,
    StyleUnit,
    TabsItemPageElement,
    TabsItemPageElementSettings,
    TabsPageElement,
    TabsPageElementSettings,
    TextPageElement,
    TextPageElementSettings,
    TitlePageElement,
    TitlePageElementSettings,
} from "@modules/constructor";
import { BackgroundFieldModel, BorderFieldModel } from "@components/ui";
import { File } from "@shared-types";
import { RootElement } from "@modules/constructor/components/elements/root/types";
import { ViewContainerRef } from "@angular/core";

export type SitePageElementUnion =
    | TabsItemPageElement
    | SectionPageElement
    | SitePageElement
    | RootElement
    | TitlePageElement
    | TextPageElement
    | InnerPageElement
    | ImagePageElement
    | TabsPageElement
    | SpacerPageElement
    | AccordionPageElement
    | AccordionItemPageElement
    | SliderPageElement
    | SliderItemPageElement
    | LinkPageElement;

export type SitePageElementSettingsUnion =
    | TabsPageElementSettings
    | SectionPageElementSettings
    | SitePageElementSettings
    | TitlePageElementSettings
    | TextPageElementSettings
    | InnerPageElementSettings
    | ImagePageElementSettings
    | TabsItemPageElementSettings;
// todo fix this

export type SitePageElement<T = SitePageElementSettingsUnion> = Readonly<{
    id: string;
    parentId: string | null;
    type: SitePageElementType;
    isExtendable: boolean;
    children: string[];
    settings: T;
}>;

export type SitePageRequestElement<StylesType = unknown> = Readonly<{
    id: string;
    parentId: string | null;
    type: SitePageElementType;
    isExtendable: boolean;
    children: string[];
    settings: RequestElementSettings<StylesType>;
}>;

export type TypeKeys<K> = (keyof K)[];

export type SitePageElementSizeSettings = Readonly<{
    width: ElementSettingsWithUnit;
    height: ElementSettingsWithUnit;
}>;

export type SitePageElementTextColor = Readonly<{
    color: string;
}>;

export type SitePageElementBackground = Readonly<{
    background: BackgroundFieldModel;
}>;

export type SitePageElementBorder = Readonly<{
    border: BorderFieldModel;
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
    pages: RootElement[];
}>;

export type CreateCampaignModel = Readonly<{
    pages: string[];
    elements: Record<string, SitePageRequestElement>;
    campaignName: string;
}>;

export type CreatePreviewModel = Readonly<{
    type: "page";
    body: {
        pages: string[];
        elements: Record<string, SitePageElement>;
    };
}>;

export type CampaignPreviewModel = Readonly<{
    id: string;
    text: string;
    name: string;
}>;

export type RequestElementSettings<T> = Readonly<{
    [key: string]: Partial<T>;

    default: Partial<T>;
}>;

export type ElementActionsConfigItem = Readonly<{
    title: string;
    icon: string;
    action: ElementActionType;
}>;
