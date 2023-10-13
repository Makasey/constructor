import { AbstractPreviewDataService } from "@core";
import { CampaignPreviewModel, CreatePreviewModel } from "@modules/constructor";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class SitePreviewDataService extends AbstractPreviewDataService<CampaignPreviewModel[]> {
    constructor(protected httpClient: HttpClient) {
        super(httpClient);
    }

    public getPreview(id: number): Observable<CampaignPreviewModel[]> {
        return this.httpClient.get<CampaignPreviewModel[]>(`http://localhost:7000/api/preview/${id}`);
    }

    public postPreview(data: CreatePreviewModel): Observable<CampaignPreviewModel[]> {
        return this.httpClient.post<CampaignPreviewModel[]>("http://localhost:7000/api/preview", data);
    }
}
