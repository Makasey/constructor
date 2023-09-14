import { APFormModel } from "@components/ui";
import { AbstractEditorOperationService } from "@modules/constructor/core/abstract/editor-operation.abstract";
import { AbstractLzStoreService } from "@core/store/abstract/lz-abstract.service";
import { EMPTY, Observable, map, shareReplay } from "rxjs";
import { Inject, Injectable } from "@angular/core";
import { LzAbstractQuery } from "@core/store/abstract/lz-abstract.query";
import { LzQueryInjectionTokensMap, LzServiceInjectionTokensMap } from "@core/store/abstract/types";
import { LzStateKey } from "@core/store/lz.state";
import { NgFormsManager } from "@ngneat/forms-manager";
import { ROOT_ELEMENT_ID } from "@modules/constructor/components/edit-area/constants";
import { SitePageElementSettings, SitePageElementSizeSettings } from "@modules/constructor/components/edit-area/types";
import { filterNilValue, logAction } from "@datorama/akita";
import { processElementSettings } from "@modules/constructor/components/edit-area/utils/element-settings.utils";

@Injectable()
export abstract class AbstractEditorElementSettingsService<K = SitePageElementSettings> extends AbstractEditorOperationService {
    protected constructor(
        protected query: LzAbstractQuery<LzStateKey.EDITOR_STATE>,
        protected readonly service: AbstractLzStoreService<LzStateKey.EDITOR_STATE>,
        protected formsManager: NgFormsManager,
    ) {
        super(query, service);
    }

    public abstract selectElementSettingsFormModel(): Observable<APFormModel | null>;

    public abstract selectSettings(id: number): Observable<K>;

    public abstract selectElementSettingsFormModelChange(): Observable<K>;

    public abstract updateElementSettings(settings: K): void;
}

@Injectable()
export class DefaultEditorElementSettingsService<K extends SitePageElementSizeSettings> extends AbstractEditorElementSettingsService<K> {
    constructor(
        @Inject(LzQueryInjectionTokensMap[LzStateKey.EDITOR_STATE]) protected readonly query: LzAbstractQuery<LzStateKey.EDITOR_STATE>,
        @Inject(LzServiceInjectionTokensMap[LzStateKey.EDITOR_STATE]) protected readonly service: AbstractLzStoreService<LzStateKey.EDITOR_STATE>,
        protected readonly formsManager: NgFormsManager,
    ) {
        super(query, service, formsManager);
    }

    public selectElementSettingsFormModel(): Observable<APFormModel | null> {
        return this.query
            .select(state => state.selectedElement)
            .pipe(
                map(selectedElement => {
                    if (selectedElement === ROOT_ELEMENT_ID) {
                        return null;
                    }

                    const element = this.getElement(selectedElement);

                    return structuredClone(processElementSettings(element.type, element));
                }),
            );
    }

    public selectElementSettingsFormModelChange(): Observable<K> {
        return EMPTY;
    }

    public updateElementSettings(value: K): void {
        const id = this.getStoreElement("selectedElement");

        logAction(`Update element settings`, id, value);

        this.service.updateState(state => {
            const { items } = state;
            const item = items[id];

            return {
                items: {
                    ...items,
                    [id]: {
                        ...item,
                        settings: {
                            ...item.settings,
                            ...value,
                        },
                    },
                },
            };
        });
    }

    public selectSettings(id: number): Observable<K> {
        return this.query.select(state => state.items[id]?.settings as K).pipe(filterNilValue(), shareReplay(1));
    }
}
