import { AbstractCartProductDataService } from "@core/data-service/cart-product-data.service";
import { Cart, CartItem } from "@shared-types/cart/cart";
import { EMPTY, Observable, catchError, map, of, tap } from "rxjs";
import { Injectable } from "@angular/core";
import { LzQuery } from "@core/store/lz.query";
import { LzService } from "@core/store/lz.service";
import { LzStateKey } from "@core/store/lz.state";
import { Product } from "@shared-types/product/product";
import { ProductCartState, UIDataState } from "@core/store/states/ui-states";
import { arrayRemove, arrayUpdate } from "@datorama/akita";

@Injectable()
export abstract class AbstractProductCartService {
    public abstract selectProductItems(): Observable<CartItem[]>;

    public abstract selectCart(): Observable<Cart | null>;

    public abstract addItemToCart(product: Product): Observable<Cart | null>;

    public abstract deleteCartItem(itemId: number, cartId: number): Observable<void>;

    public abstract isProductInCart(productId: number): boolean;

    public abstract updateCartItemCount(productId: number, count: number): Observable<void>;
}

@Injectable()
export class ProductCartService extends AbstractProductCartService {
    constructor(
        private query: LzQuery,
        private service: LzService,
        private cartProductDataService: AbstractCartProductDataService,
    ) {
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

    public deleteCartItem(itemId: number, cartId: number): Observable<void> {
        return this.cartProductDataService.removeItemFromCart(itemId, cartId).pipe(
            tap(() => {
                this.service.updateStatePart(LzStateKey.PRODUCT_CART_STATE, state => {
                    const { cart } = state;

                    if (!cart) {
                        return { ...state };
                    }

                    const updatedItems = arrayRemove<CartItem[]>(cart.items, (item: CartItem) => item.id === itemId);
                    const { total, count } = this.calculateCartItemInfo(updatedItems);

                    return {
                        ...state,
                        cart: {
                            ...cart,
                            totalPrice: total,
                            totalCount: count,
                            items: updatedItems,
                        },
                    };
                });
            }),
        );
    }

    public isProductInCart(productId: number): boolean {
        return !!(this.getProductCartState().cart?.items ?? []).find(cartItem => cartItem.product.id === productId);
    }

    public updateCartItemCount(productId: number, count: number): Observable<void> {
        const cartItem = (this.getProductCartState().cart?.items ?? []).find(item => item.product.id === productId);

        if (!cartItem) {
            return EMPTY;
        }

        const { cartId, count: cartItemCount, id } = cartItem;
        const totalCount = cartItemCount + count;

        return this.cartProductDataService.updateCartItemCount(cartId, id, totalCount).pipe(
            tap(() => {
                this.service.updateStatePart(LzStateKey.PRODUCT_CART_STATE, state => {
                    const { cart } = state;

                    if (!cart) {
                        return { ...state };
                    }

                    let updatedItems: CartItem[];

                    if (totalCount <= 0) {
                        updatedItems = arrayRemove(cart.items, (item: CartItem) => item.id === id);
                    } else {
                        updatedItems = arrayUpdate(cart.items, (item: CartItem) => item.id === id, {
                            count: totalCount,
                            subtotalPrice: totalCount * (cartItem.product.salePrice ?? cartItem.product.price),
                        });
                    }

                    const { count, total } = this.calculateCartItemInfo(updatedItems);

                    return {
                        ...state,
                        cart: {
                            ...cart,
                            items: updatedItems,
                            totalCount: count,
                            totalPrice: total,
                        },
                    };
                });
            }),
        );
    }

    private getProductCartState(): ProductCartState {
        return this.query.getValue().productCartState;
    }

    private calculateCartItemInfo(items: CartItem[]): { count: number; total: number } {
        return items.reduce(
            (result, item) => {
                return {
                    total: result.total + (item.product.salePrice ?? item.product.price) * item.count,
                    count: result.count + item.count,
                };
            },
            { total: 0, count: 0 },
        );
    }
}
