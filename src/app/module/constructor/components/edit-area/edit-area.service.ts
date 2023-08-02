import { AbstractLzStoreService } from "@core/store/abstract/lz-abstract.service";
import { Inject, Injectable } from "@angular/core";
import { LzAbstractQuery } from "@core/store/abstract/lz-abstract.query";
import { LzQueryInjectionTokensMap, LzServiceInjectionTokensMap } from "@core/store/abstract/types";
import { LzStateKey } from "@core/store/lz.state";
import { Observable } from "rxjs";
import { SitePageElement } from "@modules/constructor/components/edit-area/types";

@Injectable()
export abstract class AbstractEditAreaService {
    public abstract selectElement(id: number): Observable<SitePageElement>;

    public abstract getElement(id: number): SitePageElement;
}

@Injectable()
export class DefaultEditAreaService extends AbstractEditAreaService {
    constructor(
        @Inject(LzQueryInjectionTokensMap[LzStateKey.EDITOR_STATE]) private readonly query: LzAbstractQuery<LzStateKey.EDITOR_STATE>,
        @Inject(LzServiceInjectionTokensMap[LzStateKey.EDITOR_STATE]) private readonly service: AbstractLzStoreService<LzStateKey.EDITOR_STATE>,
    ) {
        super();
    }

    public selectElement(id: number): Observable<SitePageElement> {
        return this.query.select(state => state.items[id]);
    }

    public getElement(id: number): SitePageElement {
        return this.query.getValue().items[id];
    }
}
