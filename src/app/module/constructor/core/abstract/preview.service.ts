import { ActivatedRoute, Router } from "@angular/router";
import { Inject, Injectable, Provider, Type, inject } from "@angular/core";

import { Observable, catchError, throwError } from "rxjs";

import {
    AbstractLzStoreService,
    AbstractNavigationService,
    AbstractPreviewDataService,
    LzAbstractQuery,
    LzQueryInjectionTokensMap,
    LzServiceInjectionTokensMap,
    LzStateKey,
} from "@core";
import { LZToastrItemType, LZToastrService } from "@components";
import { getPreviewData } from "@modules/constructor";

import { ResponseError } from "@shared-types";
import { RouteKey, RouteParams } from "@shared-enums";

@Injectable()
export abstract class AbstractPreviewService<T> {
    protected readonly router = inject(Router);

    protected readonly navigationService = inject(AbstractNavigationService);

    protected readonly activatedRoute = inject(ActivatedRoute);

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

                const builderRoute = this.navigationService.buildLink(RouteKey.CAMPAIGN_EDITOR, {
                    campaignId: this.activatedRoute.snapshot.paramMap.get(RouteParams.CAMPAIGN_ID) ?? "new",
                });

                void this.router.navigate([builderRoute]);

                return throwError(() => error);
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
