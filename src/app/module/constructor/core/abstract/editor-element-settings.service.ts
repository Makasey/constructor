import { APFormModel } from "@components";
import { AbstractEditorOperationService, SitePageElementUnion, processElementSettings, processUpdateElementSettings } from "@modules/constructor";
import { AbstractLzStoreService, LzAbstractQuery, LzQueryInjectionTokensMap, LzServiceInjectionTokensMap, LzStateKey } from "@core";
import { Inject, Injectable } from "@angular/core";
import { NgFormsManager } from "@ngneat/forms-manager";
import { Observable, distinctUntilChanged, map, shareReplay } from "rxjs";
import { filterNilValue, logAction } from "@datorama/akita";
import { isObjectEquals } from "@shared-utils";

@Injectable()
export abstract class AbstractEditorElementSettingsService<
    K extends SitePageElementUnion = SitePageElementUnion,
> extends AbstractEditorOperationService {
    protected constructor(
        protected query: LzAbstractQuery<LzStateKey.EDITOR_STATE>,
        protected readonly service: AbstractLzStoreService<LzStateKey.EDITOR_STATE>,
        protected formsManager: NgFormsManager,
    ) {
        super(query, service);
    }

    public abstract selectElementSettingsFormModel(): Observable<APFormModel | null>;

    public abstract selectSettings(id: string): Observable<K["settings"]>;

    public abstract updateElementSettings(settings: K["settings"] | Partial<K["settings"]>, elementId?: string): void;
}

@Injectable()
export class DefaultEditorElementSettingsService<K extends SitePageElementUnion> extends AbstractEditorElementSettingsService<K> {
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
                map(({ selectedElement }) => {
                    if (selectedElement === this.getStoreElement("selectedPage")) {
                        return null;
                    }

                    const element = this.getElement(selectedElement);

                    return processElementSettings(element.type, element);
                }),
            );
    }

    public updateElementSettings(value: K["settings"] | Partial<K["settings"]>, elementId?: string): void {
        const id = elementId ?? this.getStoreElement("selectedElement");

        logAction(`Update element settings`, id, value);

        this.service.updateState(state => {
            return processUpdateElementSettings<K>(value, state, id);
        });
    }

    public selectSettings(id: string): Observable<K["settings"]> {
        return this.query.select(state => state.items[id]?.settings as K["settings"]).pipe(filterNilValue(), shareReplay(1));
    }
}
