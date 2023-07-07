import { Cart } from "@shared-types/cart/cart";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "@shared-types/product/product";

@Injectable()
export abstract class AbstractCartProductDataService {
    public abstract addItemToCart(product: Product): Observable<Cart>;

    public abstract removeItemFromCart(itemId: number, cartId: number): Observable<void>;

    public abstract updateCartItemCount(cartId: number, id: number, totalCount: number): Observable<void>;
}

@Injectable()
export class CartProductDataService extends AbstractCartProductDataService {
    constructor(private httpClient: HttpClient) {
        super();
    }

    public addItemToCart(product: Product): Observable<Cart> {
        return this.httpClient.post<Cart>(
            "http://localhost:7000/api/cart/add",
            { product: product.id, count: 1 },
            {
                withCredentials: true,
            },
        );
    }

    public removeItemFromCart(itemId: number, cartId: number): Observable<void> {
        return this.httpClient.post<void>(
            "http://localhost:7000/api/cart/delete",
            {
                cartId: cartId,
                cartItemId: itemId,
            },
            { withCredentials: true },
        );
    }

    public updateCartItemCount(cartId: number, id: number, totalCount: number): Observable<void> {
        return this.httpClient.post<void>(
            "http://localhost:7000/api/cart/count",
            {
                cartId: cartId,
                cartItemId: id,
                count: totalCount,
            },
            { withCredentials: true },
        );
    }
}
