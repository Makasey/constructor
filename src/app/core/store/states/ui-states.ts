import { LZTableMeta, LZTableValues } from "../../../components";
import { Product } from "../../../types";

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
