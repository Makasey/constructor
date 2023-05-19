import { APFormModel, LZTableMeta, LZTableValues } from "@components/ui";
import { Product } from "@shared-types/index";

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
    product: Product;
}> &
    TableModuleState &
    ModuleState;

export type CatalogFiltersState = Readonly<{
    filters: APFormModel;
}> &
    ModuleState;
