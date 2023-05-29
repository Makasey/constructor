import { Injectable } from "@angular/core";

import { Observable, tap } from "rxjs";

import { AbstractDefaultModuleService, AbstractModuleService } from "@core/abstract/abstract.service";
import { AbstractProductDataService } from "@core/data-service";
import { LzQuery } from "@core/store/lz.query";
import { LzService } from "@core/store/lz.service";
import { LzStateKey } from "@core/store/lz.state";
import { PaginationListItems } from "@shared-types/response/response-view.type";
import { Product } from "@shared-types/product/product";
import { SimpleMap } from "@shared-types/common/common";
import { UIDataState } from "@core/store/states/ui-states";

@Injectable()
export abstract class AbstractCatalogProductsService extends AbstractModuleService {
    public abstract getProducts(): Observable<Product[]>;

    public abstract loadMoreProducts(): Observable<PaginationListItems<Product>>;

    public abstract canLoadProducts(): Observable<boolean>;
}

@Injectable()
export class DefaultCatalogProductsService
    extends AbstractDefaultModuleService<LzStateKey.CATALOG_PRODUCTS_STATE>
    implements AbstractCatalogProductsService
{
    constructor(protected query: LzQuery, protected service: LzService, private productDataService: AbstractProductDataService) {
        super(LzStateKey.CATALOG_PRODUCTS_STATE, query, service);
    }

    public asyncInit(): Observable<PaginationListItems<Product>> {
        return this.productDataService.getProducts(this.getProductsParams()).pipe(
            tap(({ items, count }) => {
                this.updateState(state => {
                    return {
                        ...state,
                        dataState: UIDataState.LOADED,
                        products: items,
                        totalCount: count,
                    };
                });
            }),
        );
    }

    public getProducts(): Observable<Product[]> {
        return this.selectState(state => state.products);
    }

    public loadMoreProducts(): Observable<PaginationListItems<Product>> {
        this.updateState(state => ({
            ...state,
            dataState: UIDataState.LOADING,
        }));
        return this.productDataService.getProducts(this.getProductsParams()).pipe(
            tap(({ items, count }) => {
                this.updateState(state => {
                    return {
                        ...state,
                        dataState: UIDataState.LOADED,
                        products: state.products.concat(items),
                        totalCount: count,
                    };
                });
            }),
        );
    }

    private getProductsParams(): SimpleMap<number> {
        const state = this.getState();

        return {
            limit: 12,
            offset: state.products.length,
        };
    }

    public canLoadProducts(): Observable<boolean> {
        return this.selectState(state => 
            state.products.length < state.totalCount,
        );
    }
}
