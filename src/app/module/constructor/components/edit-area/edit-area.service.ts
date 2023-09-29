import { AbstractCampaignService } from "@modules/constructor/core/abstract/campaign.service";
import { AbstractLzStoreService } from "@core/store/abstract/lz-abstract.service";
import { CampaignModel, SitePageElement } from "@modules/constructor/components/edit-area";
import { Inject, Injectable } from "@angular/core";
import { LzAbstractQuery } from "@core/store/abstract/lz-abstract.query";
import { LzQueryInjectionTokensMap, LzServiceInjectionTokensMap, LzStateKey, UIDataState } from "@core/store";
import { Observable, tap } from "rxjs";

@Injectable()
export abstract class AbstractEditAreaService {
    public abstract resetState(): void;

    public abstract getCampaignById(id: number): Observable<CampaignModel>;
}

@Injectable()
export class DefaultEditAreaService extends AbstractEditAreaService {
    constructor(
        @Inject(LzQueryInjectionTokensMap[LzStateKey.EDITOR_STATE]) private readonly query: LzAbstractQuery<LzStateKey.EDITOR_STATE>,
        @Inject(LzServiceInjectionTokensMap[LzStateKey.EDITOR_STATE]) private readonly service: AbstractLzStoreService<LzStateKey.EDITOR_STATE>,
        private readonly campaignService: AbstractCampaignService,
    ) {
        super();
    }

    public resetState(): void {
        this.service.reInitiateState(LzStateKey.EDITOR_STATE);
    }

    public getCampaignById(id: number): Observable<CampaignModel> {
        return this.campaignService.getCampaignById(id).pipe(
            tap(campaign => {
                this.service.updateState(() => {
                    const { id, settings, model } = campaign;
                    const currentStateIndex = this.getMaxIndex(model);

                    return {
                        items: model,
                        dataState: UIDataState.LOADED,
                        currentStateIndex: currentStateIndex,
                        settings: {
                            ...settings,
                            id: id,
                        },
                    };
                });
            }),
        );
    }

    public getMaxIndex(items: Record<number, SitePageElement>): number {
        return Math.max(...(Object.keys(items) as unknown as number[]));
    }
}
