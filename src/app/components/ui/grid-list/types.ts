import { TemplateRef } from "@angular/core";

export enum ViewModeTypes {
    CARD = "card",
    LIST = "list",
}

export const columnsCountValiableName = "--columns-count";

export type LZGridItem = Readonly<{
    id: number | string;

    [key: string]: unknown;
}>;

export type LZGridTemplatesMap = Readonly<Record<ViewModeTypes, TemplateRef<unknown>>>;
