import { CampaignModel, PageSettings, SitePageElementUnion } from "@modules/constructor/components/edit-area/types";
import { File } from "@shared-types/index";
import { TableExtra, TableMeta, TableRow, TableValueExtraInternal } from "@components/ui";

export enum UIDataState {
    INITIAL = "initial",
    SAVING = "saving",
    LOADING = "loading",
    INVOKE_RELOAD = "invokeReload",
    EXTRA_LOADING = "extraLoading",
    LOADED = "loaded",
    ERROR = "error",
}

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
    children: number[];
    id: number;
}>;

export type EditorState = Readonly<
    {
        items: Record<string, SitePageElementUnion>;
        pages: Page[];
        selectedPage: number;
        selectedElement: number;
        currentStateIndex: number;
        id: number | undefined;
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
        selectedRows: unknown[];
        isDragging: boolean;
    } & ModuleState
>;
