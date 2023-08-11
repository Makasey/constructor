import { SitePageElementType } from "@modules/constructor/components/edit-area/types";

export type ElementButton = Readonly<{
    title: string;
    type: SitePageElementType;
    icon: string;
}>;

export const blockElements = [SitePageElementType.SECTION];
