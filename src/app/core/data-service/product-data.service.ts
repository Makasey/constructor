import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Product} from "../../types";

@Injectable({
    providedIn: "root",
})
export class ProductDataService {
    constructor(private httpClient: HttpClient) {
    }

    public getProducts(): Observable<Product[]> {
        return this.httpClient.get<Product[]>("http://localhost:7000/api/products");
    }
}
