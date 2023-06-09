import { AbstractCartProductDataService } from "@core/data-service/cart-product-data.service";
import { Cart, CartItem } from "@shared-types/cart/cart";
import { Injectable } from "@angular/core";
import { LzQuery } from "@core/store/lz.query";
import { LzService } from "@core/store/lz.service";
import { LzStateKey } from "@core/store/lz.state";
import { Observable, catchError, map, of, tap } from "rxjs";
import { Product } from "@shared-types/product/product";
import { UIDataState } from "@core/store/states/ui-states";

@Injectable()
export abstract class AbstractProductCartService {
    public abstract selectProductItems(): Observable<CartItem[]>;

    public abstract selectCart(): Observable<Cart | null>;

    public abstract addItemToCart(product: Product): Observable<Cart | null>;
}

@Injectable()
export class ProductCartService extends AbstractProductCartService {
    constructor(private query: LzQuery, private service: LzService, private cartProductDataService: AbstractCartProductDataService) {
        super();
    }

    public selectProductItems(): Observable<CartItem[]> {
        return this.query.selectStatePart(LzStateKey.PRODUCT_CART_STATE).pipe(
            map(state => {
                return state.cart?.items ?? [];
            }),
        );
    }

    public selectCart(): Observable<Cart | null> {
        return this.query.selectStatePart(LzStateKey.PRODUCT_CART_STATE).pipe(map(state => state.cart));
    }

    public addItemToCart(product: Product): Observable<Cart | null> {
        this.service.updateStatePart(LzStateKey.PRODUCT_CART_STATE, state => {
            return {
                ...state,
                dataState: UIDataState.LOADING,
            };
        });

        return this.cartProductDataService.addItemToCart(product).pipe(
            tap((cart: Cart) => {
                this.service.updateStatePart(LzStateKey.PRODUCT_CART_STATE, state => {
                    return {
                        ...state,
                        cart: cart,
                    };
                });
            }),
            catchError(error => {
                console.error(error);

                return of(null);
            }),
        );
    }
}
