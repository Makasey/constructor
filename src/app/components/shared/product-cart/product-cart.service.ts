import { CartItem } from "@shared-types/cart/cart";
import { Injectable } from "@angular/core";
import { LzQuery } from "@core/store/lz.query";
import { LzService } from "@core/store/lz.service";
import { LzStateKey } from "@core/store/lz.state";
import { Observable, map } from "rxjs";

@Injectable()
export abstract class AbstractProductCartService {
    public abstract selectProductItems(): Observable<CartItem[]>;
}

@Injectable()
export class ProductCartService extends AbstractProductCartService {
    constructor(private query: LzQuery, private service: LzService) {
        super();
    }

    public selectProductItems(): Observable<CartItem[]> {
        return this.query.selectStatePart(LzStateKey.PRODUCT_CART_STATE).pipe(
            map(state => {
                return state.cart?.items ?? [];
            }),
        );
    }
}
