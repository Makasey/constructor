import { Product } from "@shared-types/product/product";

export enum CartStatus {
    ACTIVE = "active",
    BOUGHT = "bought",
}

export type CartItem = Readonly<{
    count: number;
    subtotalPrice: number;
    cartId: number;
    id: number;
    product: Product;
}>;

export type Cart = Readonly<{
    id: number;
    totalCount: number;
    totalPrice: number;
    status: CartStatus;
    userId: number;
    items: CartItem[];
}>;
