import { AbstractDefaultModuleService, AbstractModuleService } from "@core/abstract/abstract.service";
import { AbstractProductDataService } from "@core/data-service";
import { Injectable } from "@angular/core";
import { LzQuery } from "@core/store/lz.query";
import { LzService } from "@core/store/lz.service";
import { LzStateKey } from "@core/store/lz.state";
import { Observable, tap } from "rxjs";
import { PaginationListItems } from "@shared-types/response/response-view.type";
import { Product } from "@shared-types/product/product";
import { UIDataState } from "@core/store/states/ui-states";

@Injectable()
export abstract class AbstractProductService extends AbstractModuleService {
    public abstract selectProduct(): Observable<Product[]>;
}

@Injectable()
export class DefaultProductService
    extends AbstractDefaultModuleService<LzStateKey.ROOT_STATE, { productId: number; }>
    implements AbstractProductService
{
    constructor(protected query: LzQuery, protected service: LzService, private productDataService: AbstractProductDataService) {
        super(LzStateKey.ROOT_STATE, query, service);
    }

    public asyncInit(options?: { productId: number; }): Observable<PaginationListItems<Product>> {
        return this.productDataService.getProducts({}).pipe(
            tap(({ items, count }) => {
                this.updateState(state => {
                    return {
                        ...state,
                        dataState: UIDataState.LOADED,
                        products: items,
                    };
                });
            }),
        );
    }

    public selectProduct(): Observable<Product[]> {
        return this.selectState(state => state.products);
    }
}
