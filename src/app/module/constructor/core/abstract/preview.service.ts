import {
    AbstractLzStoreService,
    AbstractPreviewDataService,
    LzAbstractQuery,
    LzQueryInjectionTokensMap,
    LzServiceInjectionTokensMap,
    LzStateKey,
} from "@core";
import { Inject, Injectable, Provider, Type } from "@angular/core";
import { LZToastrItemType, LZToastrService } from "@components";
import { Observable, catchError, of } from "rxjs";
import { ResponseError } from "@shared-types";
import { getPreviewData } from "@modules/constructor";

@Injectable()
export abstract class AbstractPreviewService<T> {
    protected constructor(
        protected query: LzAbstractQuery<LzStateKey.EDITOR_STATE>,
        protected service: AbstractLzStoreService<LzStateKey.EDITOR_STATE>,
        protected dataService: AbstractPreviewDataService<T>,
    ) {}

    public abstract getPreviewById(id: number): Observable<T>;

    public abstract postPreview(): Observable<T>;
}

@Injectable()
export class DefaultPreviewService<T> extends AbstractPreviewService<T> {
    constructor(
        @Inject(LzQueryInjectionTokensMap[LzStateKey.EDITOR_STATE]) protected query: LzAbstractQuery<LzStateKey.EDITOR_STATE>,
        @Inject(LzServiceInjectionTokensMap[LzStateKey.EDITOR_STATE]) protected service: AbstractLzStoreService<LzStateKey.EDITOR_STATE>,
        protected dataService: AbstractPreviewDataService<T>,
        protected toastrService: LZToastrService,
    ) {
        super(query, service, dataService);
    }

    public getPreviewById(id: number): Observable<T> {
        return this.dataService.getPreview(id);
    }

    public postPreview(): Observable<T> {
        const state = this.query.getValue();

        return this.dataService.postPreview(getPreviewData(state)).pipe(
            catchError((error: ResponseError) => {
                this.toastrService.addToastrItem({
                    title: "Произошла ошибка при загрузке превью",
                    type: LZToastrItemType.ERROR,
                    text: error.error?.messages?.join(", ") ?? "Не удалось загрузить превью",
                });

                return of([] as T);
            }),
        );
    }
}

export function providePreviewService<T>(existingClass: Type<AbstractPreviewService<T>> = DefaultPreviewService): Provider {
    return {
        provide: AbstractPreviewService,
        useClass: existingClass,
    };
}
