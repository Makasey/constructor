import { APFormModel, TableExtra, TableMeta, TableRow, TableValueExtraInternal } from "@components/ui";
import { CampaignModel, PageSettings, SitePageElementUnion } from "@modules/constructor/components/edit-area/types";
import { Cart, File, Product } from "@shared-types/index";

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

export type RootModuleState = Readonly<{
    products: Product[];
}> &
    TableModuleState &
    ModuleState;

export type CatalogFiltersState = Readonly<{
    filters: APFormModel;
}> &
    ModuleState;

export type CatalogProductsState = Readonly<{
    products: Product[];
    totalCount: number;
}> &
    ModuleState;

export type ProductCartState = Readonly<{
    cart: Cart | null;
}> &
    ModuleState;

export type TestState = ModuleState;

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
