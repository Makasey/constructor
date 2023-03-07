import { Injectable, TemplateRef } from "@angular/core";

import { ID, Order, QueryConfig, QueryEntity } from "@datorama/akita";

import { combineLatest, map } from "rxjs";

import { LZToastrItem, LZToastrItemComponentType, LZToastrItemState } from "../types";
import { LZToastrStore } from "./toastr.store";

@Injectable()
@QueryConfig({
    sortBy: "order",
    sortByOrder: Order.DESC,
})
export class LzToastrQuery extends QueryEntity<LZToastrItemState, LZToastrItem> {
    public selectAlwaysOnDisplay$ = this.select(state => state.ui.alwaysOnDisplay);

    public selectToastrItemsCount$ = this.selectCount();

    public selectDNDMode$ = this.select(state => state.ui.enableDNDMode);

    public templateRefMap: Map<ID, TemplateRef<unknown> | LZToastrItemComponentType> = new Map<
        ID,
        TemplateRef<unknown> | LZToastrItemComponentType
    >();

    public selectToastrItems$ = combineLatest([this.selectAll(), this.selectAlwaysOnDisplay$]).pipe(
        map(([entities, alwaysOnDisplay]) => {
            return entities
            .filter(entity => alwaysOnDisplay || entity.visibility)
            .map(entity => {
                return <LZToastrItem>{
                    ...entity,
                    template: this.templateRefMap.get(entity.id!),
                };
            });
        }),
    );

    constructor(protected store: LZToastrStore) {
        super(store);
    }

    public addTemplateOrComponent(id: ID, template: TemplateRef<unknown> | LZToastrItemComponentType): void {
        this.templateRefMap.set(id, template);
    }

    public removeTemplateRef(id: ID): void {
        this.templateRefMap.delete(id);
    }

    public getAlwaysOnDisplay(): boolean {
        return this.getValue().ui.alwaysOnDisplay;
    }
}
