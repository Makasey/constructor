import { CampaignModel, CreateCampaignModel } from "@modules/constructor";
import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, map } from "rxjs";
import { PaginationListItems } from "@shared-types";
import { mapPaginationResponseToListModel } from "@shared-utils";

@Injectable()
export abstract class AbstractCampaignDataService {
    public abstract getCampaigns(): Observable<PaginationListItems<CampaignModel>>;

    public abstract getCampaignByID(id: number): Observable<CampaignModel>;

    public abstract createCampaign(data: CreateCampaignModel): Observable<CampaignModel>;

    public abstract updateCampaignByID(id: number, data: CreateCampaignModel): Observable<CampaignModel>;

    public abstract deleteCampaignByID(id: number): Observable<void>;
}

@Injectable()
export class CampaignDataService extends AbstractCampaignDataService {
    private httpClient = inject(HttpClient);

    public getCampaigns(): Observable<PaginationListItems<CampaignModel>> {
        return this.httpClient
            .get<CampaignModel[]>("http://localhost:7000/api/constructor", {
                observe: "response",
            })
            .pipe(map(response => mapPaginationResponseToListModel(response)));
    }

    public getCampaignByID(id: number): Observable<CampaignModel> {
        return this.httpClient.get<CampaignModel>(`http://localhost:7000/api/constructor/${id}`);
    }

    public createCampaign(data: CreateCampaignModel): Observable<CampaignModel> {
        return this.httpClient.post<CampaignModel>("http://localhost:7000/api/constructor", data);
    }

    public updateCampaignByID(id: number, data: CreateCampaignModel): Observable<CampaignModel> {
        return this.httpClient.put<CampaignModel>(`http://localhost:7000/api/constructor/${id}`, data);
    }

    public deleteCampaignByID(id: number): Observable<void> {
        return this.httpClient.delete<void>(`http://localhost:7000/api/constructor/${id}`);
    }
}
