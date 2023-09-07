import { AbstractCampaignDataService } from "@core/data-service/campaign-data.service";
import { AbstractNavigationService } from "@core/navigation.service";
import { CampaignModel, CampaignType, CreateCampaignModel } from "@modules/constructor/components/edit-area/types";
import { Injectable } from "@angular/core";
import { LZToastrItemType, LZToastrService } from "@components/ui";
import { LzAbstractQuery } from "@core/store/abstract/lz-abstract.query";
import { LzState, LzStateKey } from "@core/store/lz.state";
import { Observable, catchError, tap, throwError } from "rxjs";
import { PaginationListItems } from "@shared-types/response/response-view.type";
import { RouteKey } from "@shared-types/routes/route-paths";
import { Router } from "@angular/router";

@Injectable()
export abstract class AbstractCampaignService<T = CampaignModel> {
    protected constructor(
        protected query: LzAbstractQuery<LzStateKey.EDITOR_STATE>,
        protected toastrService: LZToastrService,
        protected readonly router: Router,
        protected readonly navigationService: AbstractNavigationService,
    ) {}

    public abstract createCampaign(): Observable<T>;

    public abstract updateCampaignById(id: number): Observable<T>;

    public abstract getCampaignById(id: number): Observable<T>;

    public abstract getCampaignList(): Observable<PaginationListItems<T>>;

    public abstract deleteCampaignById(id: number): Observable<void>;

    protected abstract getCreateCampaignRequestData(): CreateCampaignModel;

    protected getStoreElement<T extends keyof LzState[LzStateKey.EDITOR_STATE]>(key: T): LzState[LzStateKey.EDITOR_STATE][T] {
        return this.query.getValue()[key];
    }
}

@Injectable()
export class SinglePageCampaignService extends AbstractCampaignService {
    constructor(
        protected toasterService: LZToastrService,
        protected readonly router: Router,
        protected readonly query: LzAbstractQuery<LzStateKey.EDITOR_STATE>,
        protected readonly navigationService: AbstractNavigationService,
        private readonly campaignDataService: AbstractCampaignDataService,
    ) {
        super(query, toasterService, router, navigationService);
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
        const id = this.getStoreElement("settings").id!;

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

                return throwError(err);
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

                return throwError(err);
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

                return throwError(err);
            }),
        );
    }

    protected getCreateCampaignRequestData(): CreateCampaignModel {
        const { settings, items } = this.query.getValue();

        return {
            model: items,
            campaignName: settings.campaignName,
            settings: {
                ...settings,
                id: undefined,
            },
            type: CampaignType.SINGLE_PAGE,
        };
    }
}
