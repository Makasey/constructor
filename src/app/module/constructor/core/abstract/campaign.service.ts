import { Inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { Observable, catchError, map, tap, throwError } from "rxjs";

import { AbstractEditorOperationService, CampaignModel, CreateCampaignModel, getCampaignData } from "@modules/constructor";
import {
    AbstractCampaignDataService,
    AbstractLzStoreService,
    AbstractNavigationService,
    LzAbstractQuery,
    LzQueryInjectionTokensMap,
    LzServiceInjectionTokensMap,
    LzStateKey,
} from "@core";
import { LZToastrItemType, LZToastrService } from "@components";
import { PaginationListItems } from "@shared-types";
import { RouteKey } from "@shared-enums";

@Injectable()
export abstract class AbstractCampaignService<T = CampaignModel> extends AbstractEditorOperationService {
    protected constructor(
        protected query: LzAbstractQuery<LzStateKey.EDITOR_STATE>,
        protected service: AbstractLzStoreService<LzStateKey.EDITOR_STATE>,
        protected toastrService: LZToastrService,
        protected readonly router: Router,
        protected readonly navigationService: AbstractNavigationService,
    ) {
        super(query, service);
    }

    public abstract createCampaign(): Observable<T>;

    public abstract updateCampaignById(): Observable<T>;

    public abstract getCampaignById(id: number): Observable<T>;

    public abstract getCampaignList(): Observable<PaginationListItems<T>>;

    public abstract deleteCampaignById(id: number): Observable<void>;

    public abstract selectIsNewCampaign(): Observable<boolean>;

    protected abstract getCreateCampaignRequestData(): CreateCampaignModel;
}

@Injectable()
export class SinglePageCampaignService extends AbstractCampaignService {
    constructor(
        @Inject(LzQueryInjectionTokensMap[LzStateKey.EDITOR_STATE]) protected readonly query: LzAbstractQuery<LzStateKey.EDITOR_STATE>,
        @Inject(LzServiceInjectionTokensMap[LzStateKey.EDITOR_STATE]) protected readonly service: AbstractLzStoreService<LzStateKey.EDITOR_STATE>,
        protected toasterService: LZToastrService,
        protected readonly router: Router,
        protected readonly navigationService: AbstractNavigationService,
        private readonly campaignDataService: AbstractCampaignDataService,
    ) {
        super(query, service, toasterService, router, navigationService);
    }

    public createCampaign(): Observable<CampaignModel> {
        return this.campaignDataService.createCampaign(this.getCreateCampaignRequestData()).pipe(
            tap(() => {
                this.toastrService.addToastrItem({
                    type: LZToastrItemType.SUCCESS,
                    text: `Компания успешно создана`,
                    title: "Успех",
                });

                const link = this.navigationService.buildLink(RouteKey.CAMPAIGN_LIST);

                void this.router.navigate([link]);
            }),
        );
    }

    public updateCampaignById(): Observable<CampaignModel> {
        const id = this.getStoreElement("id")!;

        return this.campaignDataService.updateCampaignByID(id, this.getCreateCampaignRequestData()).pipe(
            tap(() => {
                this.toastrService.addToastrItem({
                    type: LZToastrItemType.SUCCESS,
                    text: `Компания с id: ${id} успешно обновлена`,
                    title: "Успех",
                });

                const link = this.navigationService.buildLink(RouteKey.CAMPAIGN_LIST);

                void this.router.navigate([link]);
            }),
        );
    }

    public getCampaignById(id: number): Observable<CampaignModel> {
        return this.campaignDataService.getCampaignByID(id).pipe(
            catchError(err => {
                this.toastrService.addToastrItem({
                    type: LZToastrItemType.ERROR,
                    title: "Компания не найдена",
                    text: `Компания с id: ${id} не найдена`,
                });

                const link = this.navigationService.buildLink(RouteKey.CAMPAIGN_LIST);

                void this.router.navigate([link]);

                return throwError(() => err);
            }),
        );
    }

    public getCampaignList(): Observable<PaginationListItems<CampaignModel>> {
        return this.campaignDataService.getCampaigns().pipe(
            catchError(err => {
                this.toastrService.addToastrItem({
                    type: LZToastrItemType.ERROR,
                    title: "Компании не найдены",
                    text: `Произошла ошибка при получении списка компаний`,
                });

                const link = this.navigationService.buildLink(RouteKey.CAMPAIGN_LIST);

                void this.router.navigate([link]);

                return throwError(() => err);
            }),
        );
    }

    public deleteCampaignById(id: number): Observable<void> {
        return this.campaignDataService.deleteCampaignByID(id).pipe(
            catchError(err => {
                this.toastrService.addToastrItem({
                    type: LZToastrItemType.ERROR,
                    title: `Произошла ошибка при удалении компании с id: ${id}`,
                    text: `Произошла ошибка при удалении компании с id: ${id}`,
                });

                const link = this.navigationService.buildLink(RouteKey.CAMPAIGN_LIST);

                void this.router.navigate([link]);

                return throwError(() => err);
            }),
        );
    }

    protected getCreateCampaignRequestData(): CreateCampaignModel {
        return getCampaignData(this.query.getValue());
    }

    public selectIsNewCampaign(): Observable<boolean> {
        return this.query
            .select(state => state.id)
            .pipe(
                map(id => {
                    return !id;
                }),
            );
    }
}
