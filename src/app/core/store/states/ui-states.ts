import { APFormModel, LZTableMeta, LZTableValues } from "@components/ui";
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
    tableMeta: LZTableMeta[];
    tableValues: LZTableValues[];
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

export type EditorState = Readonly<
    {
        settings: PageSettings;
        items: Record<string, SitePageElementUnion>;
        selectedElement: number;
        currentStateIndex: number;
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
