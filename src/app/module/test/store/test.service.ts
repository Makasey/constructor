import { Injectable } from "@angular/core";
import { TestStore } from "./test.store";
import { TestQuery } from "./test.query";
import { Observable, tap } from "rxjs";
import { Product } from "../../../types";
import { ProductDataService } from "../../../core/data-service";
import { arrayAdd } from "@datorama/akita";

@Injectable({
    providedIn: "root",
})
export class TestService {
    constructor(private store: TestStore, private query: TestQuery, private productDataService: ProductDataService) {}

    public fetchProducts(): Observable<Product[]> {
        return this.productDataService.getProducts().pipe(
            tap((products: Product[]) => {
                this.store.update(state => {
                    return {
                        products: state.products.concat(products),
                    };
                });
            }),
        );
    }

    public test(): void {
        this.store.update(state => {
            return {
                products: arrayAdd(
                    state.products,
                    {
                        id: 1,
                        title: "Липовая роза",
                        price: 120,
                        salePrice: 120,
                        description: "Это самая лучшая роза",
                        count: 120,
                        currencies: [
                            {
                                id: 1,
                                currencyCode: "RUS",
                                currencySymbol: "₽",
                            },
                        ],
                        categories: [
                            {
                                id: 1,
                                value: "Розы",
                            },
                        ],
                        options: [
                            {
                                id: 1,
                                name: "color",
                                value: "#749231",
                            },
                        ],
                        photos: [
                            {
                                id: 1,
                                fileName: "photo.png",
                                path: "http://localhost:7000/photo.png",
                                size: 120000,
                            },
                        ],
                    },
                    {
                        prepend: true,
                    },
                ),
            };
        });
    }

    public selectProducts(): Observable<Product[]> {
        return this.query.select(state => state.products);
    }

    public getProducts(): Product[] {
      return this.query.getValue().products;
    }
}
