export enum ViewModeTypes {
    CARD = "card",
    LIST = "list",
}

export const columnsCountVariableName = "--columns-count";

export type LZGridItem = Readonly<{
    id: number | string;

    [key: string]: unknown;
}>;

export type LZGridTemplateData = Readonly<{ item: LZGridItem; }>;
