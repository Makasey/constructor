import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export abstract class LZAbstractAuthDataService {
    public abstract login(loginData: { email: string; password: string; }): Observable<unknown>;
}

@Injectable()
export class LZDefaultAuthDataService extends LZAbstractAuthDataService {
    constructor(private httpClient: HttpClient) {
        super();
    }

    public login(loginData: { email: string; password: string; }): Observable<unknown> {
        return this.httpClient.post("http://178.172.139.42:7000/api/auth/login", loginData);
    }
}
