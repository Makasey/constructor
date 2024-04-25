import { File } from "@shared-types";

import { TableExtra, TableMeta, TableRow, TableValueExtraInternal } from "@components";

import { UIDataState } from "@core";

import { CampaignModel, PageSettings, SitePageElementUnion } from "@modules/constructor";

export type UIDataStateful = Readonly<{
    dataState: UIDataState;
}>;

export type ModuleState = UIDataStateful;

export type TableModuleState = Readonly<{
    tableMeta: TableMeta[];
    tableValues: TableRow[];
}>;

export type Page = Readonly<{
    settings: PageSettings;
    children: string[];
    id: string;
}>;

export type EditorState = Readonly<
    {
        items: Record<string, SitePageElementUnion>;
        pages: Page[];
        selectedPage: string;
        selectedElement: string;
        id: number | undefined;
        campaignName: string;
    } & ModuleState
>;

export type CampaignListState = Readonly<
    {
        campaigns: CampaignModel[];
    } & ModuleState &
        TableModuleState
>;

export type FilesState = Readonly<
    {
        files: File[];
    } & ModuleState
>;

export type TableState = Readonly<
    {
        tableMeta: TableMeta[];
        tableRows: TableRow[];
        tableExtra: TableExtra;
        valuesExtra: TableValueExtraInternal;
        selectedRows: Set<unknown>;
        isDragging: boolean;
    } & ModuleState
>;
