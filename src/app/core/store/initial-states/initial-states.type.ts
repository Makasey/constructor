import { APFormModel } from "@components/ui";
import { Product } from "@shared-types/index";

import { CatalogFiltersState, CatalogProductsState, ModuleState, RootModuleState, TableModuleState, UIDataState } from "../states/ui-states";

export function initialTableModuleState(): TableModuleState {
    return {
        tableMeta: [],
        tableValues: [],
    };
}

export function initialModuleDataState(): ModuleState {
    return {
        dataState: UIDataState.INITIAL,
    };
}

export function initialRootModuleState(): RootModuleState {
    return {
        ...initialModuleDataState(),
        ...initialTableModuleState(),
        product: {} as Product,
    };
}

export function initialCatalogFiltersState(): CatalogFiltersState {
    return {
        ...initialModuleDataState(),
        filters: {} as APFormModel,
    };
}

export function initialCatalogProductState(): CatalogProductsState {
    return {
        ...initialModuleDataState(),
        products: [],
    };
}
