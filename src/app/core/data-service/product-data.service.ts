import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable, map } from "rxjs";

import { PaginationListItems, Product, SimpleMap } from "../../types";
import { mapPaginationResponseToListModel } from "@shared-utils/utils";

@Injectable()
export abstract class AbstractProductDataService {
    public abstract getProducts(params: SimpleMap<number>): Observable<PaginationListItems<Product>>;
}

@Injectable()
export class ProductDataService extends AbstractProductDataService {
    constructor(private httpClient: HttpClient) {
        super();
    }

    public getProducts(params: SimpleMap<number>): Observable<PaginationListItems<Product>> {
        return this.httpClient
        .get<Product[]>("http://178.172.139.42:7000/api/products", {
            params: params,
            observe: "response",
        })
        .pipe(map(response => mapPaginationResponseToListModel(response)));
    }
}
