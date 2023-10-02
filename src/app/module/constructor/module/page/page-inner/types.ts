import { SitePageElementType } from "@modules/constructor";

export type ElementButton = Readonly<{
    title: string;
    type: SitePageElementType;
    icon: string;
}>;
