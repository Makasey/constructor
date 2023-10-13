import { AbstractCampaignDataService, AbstractDefaultModuleService, AbstractModuleService, LzQuery, LzService, LzStateKey, UIDataState } from "@core";
import { CampaignModel } from "@modules/constructor";
import { EMPTY, Observable, tap } from "rxjs";
import { Injectable } from "@angular/core";
import { LZToastrItemType, LZToastrService, TableMeta } from "@components";
import { PaginationListItems } from "@shared-types";
import { arrayRemove } from "@datorama/akita";

@Injectable()
export abstract class AbstractCampaignListService extends AbstractModuleService {
    public abstract selectTableMeta(): Observable<TableMeta[]>;

    public abstract selectTableValues(): Observable<CampaignModel[]>;

    public abstract deleteCampaignByID(id: number): Observable<void>;

    public abstract sendMessage(eventName: string, msg: string): void;

    public abstract selectMessages(eventName: string): Observable<unknown>;
}

@Injectable()
export class DefaultCampaignListService extends AbstractDefaultModuleService<LzStateKey.CAMPAIGN_LIST> implements AbstractCampaignListService {
    constructor(
        protected readonly query: LzQuery,
        protected readonly service: LzService,
        // private readonly socket: WebsocketService,
        private readonly campaignDataService: AbstractCampaignDataService,
        private readonly toastrService: LZToastrService,
    ) {
        super(LzStateKey.CAMPAIGN_LIST, query, service);
    }

    public sendMessage(eventName: string, msg: string): void {
        // return this.socket.sendMessage(eventName, msg);
    }

    public selectMessages(eventName: string): Observable<unknown> {
        // return this.socket.subscribeToEvent(eventName);

        return EMPTY;
    }

    public asyncInit(): Observable<PaginationListItems<CampaignModel>> {
        return this.campaignDataService.getCampaigns().pipe(
            tap(({ items, count }) => {
                this.updateState(() => {
                    return {
                        tableMeta: this.getTableMeta(),
                        campaigns: items,
                        dataState: UIDataState.LOADED,
                        tableValues: items,
                    };
                });
            }),
        );
    }

    private getTableMeta(): TableMeta[] {
        return [
            {
                label: "ID",
                fieldKey: "id",
                width: 400,
            },
            {
                label: "Имя компании",
                fieldKey: "campaignName",
                width: 400,
            },
            {
                label: "Тип компании",
                fieldKey: "type",
                width: 400,
            },
            {
                label: "Действия",
                templateKey: "actionsTemplate",
                customClass: "actions-column",
                fieldKey: "id",
                width: 400,
            },
        ];
    }

    public selectTableMeta(): Observable<TableMeta[]> {
        return this.selectState(state => state.tableMeta);
    }

    public selectTableValues(): Observable<CampaignModel[]> {
        return this.selectState(state => state.campaigns);
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
