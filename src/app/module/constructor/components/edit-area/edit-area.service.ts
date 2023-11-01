import { AbstractCampaignService, CreateCampaignModel } from "@modules/constructor";
import { AbstractLzStoreService, LzAbstractQuery, LzQueryInjectionTokensMap, LzServiceInjectionTokensMap, LzStateKey } from "@core";
import { Inject, Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { processCampaignResponse } from "@modules/constructor/utils";

@Injectable()
export abstract class AbstractEditAreaService {
    public abstract resetState(): void;

    public abstract getCampaignById(id: number): Observable<CreateCampaignModel & { id: number }>;
}

@Injectable()
export class DefaultEditAreaService extends AbstractEditAreaService {
    constructor(
        @Inject(LzQueryInjectionTokensMap[LzStateKey.EDITOR_STATE]) private readonly query: LzAbstractQuery<LzStateKey.EDITOR_STATE>,
        @Inject(LzServiceInjectionTokensMap[LzStateKey.EDITOR_STATE]) private readonly service: AbstractLzStoreService<LzStateKey.EDITOR_STATE>,
        private readonly campaignService: AbstractCampaignService<CreateCampaignModel & { id: number }>,
    ) {
        super();
    }

    public resetState(): void {
        this.service.reInitiateState(LzStateKey.EDITOR_STATE);
    }

    public getCampaignById(id: number): Observable<CreateCampaignModel & { id: number }> {
        return this.campaignService.getCampaignById(id).pipe(
            tap(campaign => {
                this.service.updateState(() => {
                    return processCampaignResponse(campaign);
                });
            }),
        );
    }
}
