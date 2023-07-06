import { APFormModel, LZTableMeta, LZTableValues } from "@components/ui";
import { Cart, Product } from "@shared-types/index";

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
