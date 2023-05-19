import { AbstractDefaultModuleService, AbstractModuleService } from "src/app/core/abstract/abstract.service";
import { AbstractProductDataService } from "src/app/core/data-service";
import { Injectable } from "@angular/core";
import { LzQuery } from "src/app/core/store/lz.query";
import { LzService } from "src/app/core/store/lz.service";
import { LzStateKey } from "src/app/core/store/lz.state";
import { Observable, tap } from "rxjs";
import { Product } from "src/app/types";
import { UIDataState } from "src/app/core/store/states/ui-states";
import { mockProducts } from "./mock-products";

@Injectable()
export abstract class AbstractCatalogProductsService extends AbstractModuleService {
    public abstract getProducts(): Observable<Product[]>;
}

@Injectable()
export class DefaultCatalogProductsService
    extends AbstractDefaultModuleService<LzStateKey.CATALOG_PRODUCTS_STATE>
    implements AbstractCatalogProductsService
{
    constructor(protected query: LzQuery, protected service: LzService, private productDataService: AbstractProductDataService) {
        super(LzStateKey.CATALOG_PRODUCTS_STATE, query, service);
    }

    public asyncInit(): Observable<unknown> {
        return this.productDataService.getProducts().pipe(
            tap(products => {
                this.updateState(state => {
                    return {
                        ...state,
                        dataState: UIDataState.LOADED,
                        products: mockProducts,
                    };
                });
            }),
        );
    }

    public getProducts(): Observable<Product[]> {
        return this.selectState(state => state.products);
    }
}
