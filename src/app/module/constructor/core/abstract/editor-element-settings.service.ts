import { APFormModel } from "@components/ui";
import { AbstractEditorOperationService } from "@modules/constructor/core/abstract/editor-operation.abstract";
import { AbstractLzStoreService } from "@core/store/abstract/lz-abstract.service";
import { Inject, Injectable } from "@angular/core";
import { LzAbstractQuery } from "@core/store/abstract/lz-abstract.query";
import { LzQueryInjectionTokensMap, LzServiceInjectionTokensMap } from "@core/store/abstract/types";
import { LzStateKey } from "@core/store/lz.state";
import { NgFormsManager } from "@ngneat/forms-manager";
import { Observable, distinctUntilChanged, map, shareReplay, skip, tap } from "rxjs";
import {
    ROOT_ELEMENT_ID,
    SitePageElementSettings,
    SitePageElementSizeSettings,
    isObjectEquals,
} from "@modules/constructor/components/edit-area/types";
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

                    return processElementSettings(element.type, element);
                }),
            );
    }

    public selectElementSettingsFormModelChange(): Observable<K> {
        return this.formsManager.valueChanges("elementSettings").pipe(
            skip(1),
            distinctUntilChanged((previous, current) => isObjectEquals(previous, current)),
            map((value: Record<string, K>) => {
                const settings = Object.values(value);

                return settings.reduce((result, value) => ({ ...result, ...value }), {} as K);
            }),
            tap(value => this.updateElementSettings(value)),
        );
    }

    protected updateElementSettings(value: K): void {
        const id = this.getStoreElement("selectedElement");

        logAction(`Update element settings`, id, value);

        this.service.updateState(state => {
            const { items } = state;
            const item = items[id];
            const { settings } = item;

            const width = {
                ...settings.width,
                value: value.width,
            };

            const height = {
                ...settings.height,
                value: value.height,
            };

            return {
                items: {
                    ...items,
                    [id]: {
                        ...item,
                        settings: {
                            ...item.settings,
                            ...value,
                            width: width,
                            height: height,
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
