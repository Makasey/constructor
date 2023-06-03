import { Cart } from "@shared-types/cart/cart";
import { HttpClient } from "@angular/common/http";
import { LzService } from "@core/store/lz.service";
import { LzStateKey } from "@core/store/lz.state";
import { Observable, catchError, of, tap } from "rxjs";
import { UIDataState } from "@core/store/states/ui-states";
import { inject } from "@angular/core";

export function initProductCartFactory(): () => Observable<Cart | null> {
    const httpClient = inject(HttpClient);
    const lzService = inject(LzService);

    return () =>
        httpClient.get<Cart | null>("http://localhost:7000/api/cart", { withCredentials: true }).pipe(
            tap(cart => {
                lzService.updateStatePart(LzStateKey.PRODUCT_CART_STATE, () => {
                    return {
                        dataState: UIDataState.LOADED,
                        cart: cart,
                    };
                });
            }),
            catchError(error => {
                console.error(error);

                lzService.updateStatePart(LzStateKey.PRODUCT_CART_STATE, () => {
                    return {
                        dataState: UIDataState.LOADED,
                        cart: null,
                    };
                });

                return of(null);
            }),
        );
}
