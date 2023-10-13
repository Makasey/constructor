import { CreatePreviewModel } from "@modules/constructor";
import { HttpClient } from "@angular/common/http";
import { Injectable, Provider, Type } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export abstract class AbstractPreviewDataService<T> {
    protected constructor(protected httpClient: HttpClient) {}

    public abstract getPreview(id: number): Observable<T>;

    public abstract postPreview(data: CreatePreviewModel): Observable<T>;
}

export function providePreviewDataService<T>(existing: Type<AbstractPreviewDataService<T>>): Provider {
    return {
        provide: AbstractPreviewDataService,
        useClass: existing,
    };
}
