import { File } from "@shared-types";

import { TableExtra, TableMeta, TableRow, TableValueExtraInternal } from "@components";

import { UIDataState } from "@core";

import { CampaignModel, SitePageElementUnion } from "@modules/constructor";

export type UIDataStateful = Readonly<{
    dataState: UIDataState;
}>;

export type ModuleState = UIDataStateful;

export type TableModuleState = Readonly<{
    tableMeta: TableMeta[];
    tableValues: TableRow[];
}>;

export type EditorState = Readonly<
    {
        items: Record<string, SitePageElementUnion>;
        pages: string[];
        selectedPage: string;
        selectedElement: string;
        id: number | undefined;
        campaignName: string;
        savedShowItems: SitePageElementUnion[];
        savedUpdatedItems: Record<string, SitePageElementUnion>;
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
