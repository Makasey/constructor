import { AbstractCampaignDataService } from "@core/data-service/campaign-data.service";
import { AbstractDefaultModuleService, AbstractModuleService } from "@core/abstract/abstract.service";
import { CampaignModel } from "@modules/constructor/components/edit-area/types";
import { Injectable } from "@angular/core";
import { LZTableMeta, LZTableValues, LZToastrItemType, LZToastrService } from "@components/ui";
import { LzQuery } from "@core/store/lz.query";
import { LzService } from "@core/store/lz.service";
import { LzStateKey } from "@core/store/lz.state";
import { Observable, tap } from "rxjs";
import { PaginationListItems } from "@shared-types/response/response-view.type";
import { UIDataState } from "@core/store/states/ui-states";
import { arrayRemove } from "@datorama/akita";

@Injectable()
export abstract class AbstractCampaignListService extends AbstractModuleService {
    public abstract selectTableMeta(): Observable<LZTableMeta[]>;

    public abstract selectTableValues(): Observable<LZTableValues[]>;

    public abstract deleteCampaignByID(id: number): Observable<void>;
}

@Injectable()
export class DefaultCampaignListService extends AbstractDefaultModuleService<LzStateKey.CAMPAIGN_LIST> implements AbstractCampaignListService {
    constructor(
        protected readonly query: LzQuery,
        protected readonly service: LzService,
        private readonly campaignDataService: AbstractCampaignDataService,
        private readonly toastrService: LZToastrService,
    ) {
        super(LzStateKey.CAMPAIGN_LIST, query, service);
    }

    public asyncInit(): Observable<PaginationListItems<CampaignModel>> {
        return this.campaignDataService.getCampaigns().pipe(
            tap(({ items, count }) => {
                this.updateState(() => {
                    return {
                        tableMeta: this.getTableMeta(),
                        campaigns: items,
                        dataState: UIDataState.LOADED,
                        tableValues: items.map(item => this.convertCampaignModelToTableValue(item)),
                    };
                });
            }),
        );
    }

    private getTableMeta(): LZTableMeta[] {
        return [
            {
                label: "ID",
                fieldKey: "id",
            },
            {
                label: "Имя компании",
                fieldKey: "campaignName",
            },
            {
                label: "Тип компании",
                fieldKey: "type",
            },
            {
                label: "Действия",
                templateKey: "actionsTemplate",
                customClass: "actions-column",
                fieldKey: "actions",
            },
        ];
    }

    private convertCampaignModelToTableValue(campaign: CampaignModel): LZTableValues {
        const { campaignName, id, type } = campaign;

        return {
            id: id,
            campaignName: campaignName,
            type: type,
            actions: id,
        };
    }

    public selectTableMeta(): Observable<LZTableMeta[]> {
        return this.selectState(state => state.tableMeta);
    }

    public selectTableValues(): Observable<LZTableValues[]> {
        return this.selectState(state => state.tableValues);
    }

    public deleteCampaignByID(id: number): Observable<void> {
        return this.campaignDataService.deleteCampaignByID(id).pipe(
            tap(() => {
                this.updateState(state => {
                    return {
                        tableValues: arrayRemove(state.tableValues, (tableValue: { id: number }) => tableValue.id === id),
                        campaigns: arrayRemove(state.campaigns, (campaign: CampaignModel) => campaign.id === id),
                    };
                });

                this.toastrService.addToastrItem({
                    type: LZToastrItemType.SUCCESS,
                    text: `Компания с id: ${id} успешно удалена`,
                    title: "Удаление прошло успешно",
                });
            }),
        );
    }
}
