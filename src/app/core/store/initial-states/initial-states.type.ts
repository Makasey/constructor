import { APFormModel } from "../../../components/form";
import { CatalogFiltersState, ModuleState, RootModuleState, TableModuleState, UIDataState } from "../states/ui-states";
import { Product } from "../../../types";

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
