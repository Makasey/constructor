import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable, map, tap } from "rxjs";

import { Product } from "../../types";

@Injectable()
export abstract class AbstractProductDataService {
    public abstract getProducts(): Observable<Product[]>;
}

@Injectable()
export class ProductDataService extends AbstractProductDataService {
    constructor(private httpClient: HttpClient) {
        super();
    }

    public getProducts(): Observable<Product[]> {
        return this.httpClient.get<Product[]>("http://178.172.139.42:7000/api/products").pipe(
            tap(response => {
                console.log(response);
            }),
            map(response => response),
        );
    }
}
