import { APFormModel } from "@components";
import {
    AbstractEditorOperationService,
    ROOT_ELEMENT_ID,
    SitePageElementSettings,
    SitePageElementSizeSettings,
    processElementSettings,
} from "@modules/constructor";
import { AbstractLzStoreService, LzAbstractQuery, LzQueryInjectionTokensMap, LzServiceInjectionTokensMap, LzStateKey } from "@core";
import { Inject, Injectable } from "@angular/core";
import { NgFormsManager } from "@ngneat/forms-manager";
import { Observable, distinctUntilChanged, map, shareReplay } from "rxjs";
import { filterNilValue, logAction } from "@datorama/akita";
import { isObjectEquals } from "@shared-utils";

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

    public abstract updateElementSettings(settings: K | Partial<K>, elementId?: number): void;
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
            .select(({ selectedElement, items }) => {
                return {
                    selectedElement: selectedElement,
                    settings: items[selectedElement].settings,
                };
            })
            .pipe(
                distinctUntilChanged(isObjectEquals),
                map(({ selectedElement, settings }) => {
                    if (selectedElement === ROOT_ELEMENT_ID) {
                        return null;
                    }

                    const element = this.getElement(selectedElement);

                    return processElementSettings(element.type, element);
                }),
            );
    }

    public updateElementSettings(value: K | Partial<K>, elementId?: number): void {
        const id = elementId ?? this.getStoreElement("selectedElement");

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
