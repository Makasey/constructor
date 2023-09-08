import { AbstractLzStoreService } from "@core/store/abstract/lz-abstract.service";
import { LzAbstractQuery } from "@core/store/abstract/lz-abstract.query";
import { LzState, LzStateKey } from "@core/store/lz.state";
import { SitePageElement, SitePageElementSettings } from "@modules/constructor/components/edit-area/types";

export abstract class AbstractEditorOperationService {
    protected constructor(
        protected query: LzAbstractQuery<LzStateKey.EDITOR_STATE>,
        protected service: AbstractLzStoreService<LzStateKey.EDITOR_STATE>,
    ) {}

    public getStoreElement<T extends keyof LzState[LzStateKey.EDITOR_STATE]>(key: T): LzState[LzStateKey.EDITOR_STATE][T] {
        return this.query.getValue()[key];
    }

    public getElement<T = SitePageElementSettings>(id: number): SitePageElement<T> {
        return this.getStoreElement("items")[id] as SitePageElement<T>;
    }
}
