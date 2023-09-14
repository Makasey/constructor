import { AbstractLzStoreService } from "@core/store/abstract/lz-abstract.service";
import { Inject, Injectable } from "@angular/core";
import { LzAbstractQuery } from "@core/store/abstract/lz-abstract.query";
import { LzQueryInjectionTokensMap, LzServiceInjectionTokensMap } from "@core/store/abstract/types";
import { LzState, LzStateKey } from "@core/store/lz.state";
import { Observable } from "rxjs";
import { ROOT_ELEMENT_ID } from "@modules/constructor/components/edit-area/constants";
import { logAction } from "@datorama/akita";

@Injectable()
export abstract class AbstractEditorSelectionService {
    protected constructor(
        protected query: LzAbstractQuery<LzStateKey.EDITOR_STATE>,
        protected service: AbstractLzStoreService<LzStateKey.EDITOR_STATE>,
    ) {}

    public updateSelection(elementId: number): void {
        this.service.updateState(state => {
            const shouldDeselectItem = elementId === state.selectedElement;
            logAction(`${shouldDeselectItem ? "deselect" : "select"}: ${elementId}`, [elementId]);
            return {
                selectedElement: shouldDeselectItem ? ROOT_ELEMENT_ID : elementId,
            };
        });
    }

    public selectSelectedElement(): Observable<number> {
        return this.query.select(state => state.selectedElement);
    }

    public tabSelection(currentIndex?: number): void {
        const index = (currentIndex ?? this.getStoreElement("selectedElement")) + 1;
        const items = this.getStoreElement("items");
        const currentStateIndex = this.getStoreElement("currentStateIndex");

        if (index > currentStateIndex) {
            this.service.updateState(() => {
                return {
                    selectedElement: ROOT_ELEMENT_ID,
                };
            });

            return;
        }

        if (items[index]) {
            this.service.updateState(() => {
                return {
                    selectedElement: index,
                };
            });

            return;
        }

        this.tabSelection(index);
    }

    protected getStoreElement<T extends keyof LzState[LzStateKey.EDITOR_STATE]>(key: T): LzState[LzStateKey.EDITOR_STATE][T] {
        return this.query.getValue()[key];
    }
}

@Injectable()
export class SinglePageEditorSelectionService extends AbstractEditorSelectionService {
    constructor(
        @Inject(LzQueryInjectionTokensMap[LzStateKey.EDITOR_STATE]) protected readonly query: LzAbstractQuery<LzStateKey.EDITOR_STATE>,
        @Inject(LzServiceInjectionTokensMap[LzStateKey.EDITOR_STATE]) protected readonly service: AbstractLzStoreService<LzStateKey.EDITOR_STATE>,
    ) {
        super(query, service);
    }
}
