import { APFormDefaultTemplateKeys, APFormModel } from "@components/ui";
import { AbstractLzStoreService } from "@core/store/abstract/lz-abstract.service";
import { Inject, Injectable } from "@angular/core";
import { LzAbstractQuery } from "@core/store/abstract/lz-abstract.query";
import { LzQueryInjectionTokensMap, LzServiceInjectionTokensMap } from "@core/store/abstract/types";
import { LzState, LzStateKey } from "@core/store/lz.state";
import { NgFormsManager } from "@ngneat/forms-manager";
import { Observable, distinctUntilChanged, map, tap } from "rxjs";
import {
    PageSettings,
    SitePageElement,
    SitePageElementType,
    defaultPageElementSettingsMap,
    isObjectEquals,
} from "@modules/constructor/components/edit-area/types";
import { arrayAdd, arrayRemove, logAction } from "@datorama/akita";

@Injectable()
export abstract class AbstractEditAreaService {
    public abstract selectElement(id: number): Observable<SitePageElement>;

    public abstract getElement(id: number): SitePageElement;

    public abstract addElement(parentId: number, type: SitePageElementType): void;

    public abstract deleteElement(parentId: number, elementId: number): void;

    public abstract updateSelection(elementId: number): void;

    public abstract selectSelectedElement(): Observable<number | null>;

    public abstract selectFormModel(): Observable<APFormModel>;

    public abstract selectFormModelChange(): Observable<PageSettings>;
}

@Injectable()
export class DefaultEditAreaService extends AbstractEditAreaService {
    constructor(
        @Inject(LzQueryInjectionTokensMap[LzStateKey.EDITOR_STATE]) private readonly query: LzAbstractQuery<LzStateKey.EDITOR_STATE>,
        @Inject(LzServiceInjectionTokensMap[LzStateKey.EDITOR_STATE]) private readonly service: AbstractLzStoreService<LzStateKey.EDITOR_STATE>,
        private readonly formsManager: NgFormsManager,
    ) {
        super();
    }

    public selectElement(id: number): Observable<SitePageElement> {
        return this.query.select(state => state.items[id]);
    }

    public getElement(id: number): SitePageElement {
        return this.getStoreElement("items")[id];
    }

    public addElement(parentId: number, type: SitePageElementType): void {
        this.service.updateState(state => {
            const newElementID = this.getStoreElement("currentStateIndex") + 1;
            logAction(`Add element with id: ${newElementID}`);
            const items = state.items;
            const parentElement = items[parentId];
            const newElement: SitePageElement = {
                id: newElementID,
                ...defaultPageElementSettingsMap[type],
            };

            return {
                currentStateIndex: state.currentStateIndex > newElementID ? state.currentStateIndex : newElementID,
                selectedElement: newElementID,
                items: {
                    ...items,
                    [parentId]: {
                        ...parentElement,
                        children: arrayAdd(parentElement.children, newElementID),
                    },
                    [newElementID]: newElement,
                },
            };
        });
    }

    public deleteElement(parentId: number, elementId: number): void {
        logAction(`Delete element with id: ${elementId}`, [], { id: elementId });

        this.service.updateState(state => {
            const items = { ...state.items };
            const parentElement = items[parentId];

            delete items[elementId];

            return {
                currentStateIndex: state.currentStateIndex === elementId ? elementId - 1 : state.currentStateIndex,
                items: {
                    ...items,
                    [parentId]: {
                        ...parentElement,
                        children: arrayRemove<number[], number>(parentElement.children, item => item === elementId),
                    },
                },
                selectedElement: state.selectedElement === elementId ? null : state.selectedElement,
            };
        });
    }

    private getStoreElement<T extends keyof LzState[LzStateKey.EDITOR_STATE]>(key: T): LzState[LzStateKey.EDITOR_STATE][T] {
        return this.query.getValue()[key];
    }

    public updateSelection(elementId: number): void {
        this.service.updateState(state => {
            const shouldDeselectItem = elementId === state.selectedElement;
            logAction(`${shouldDeselectItem ? "deselect" : "select"}: ${elementId}`, [elementId]);
            return {
                selectedElement: shouldDeselectItem ? null : elementId,
            };
        });
    }

    public selectSelectedElement(): Observable<number | null> {
        return this.query.select(state => state.selectedElement);
    }

    public selectFormModel(): Observable<APFormModel> {
        return this.query
            .select(state => state.settings)
            .pipe(
                map(settings => {
                    const { title, campaignName } = settings;

                    return {
                        id: crypto.randomUUID(),
                        name: "globalSettings",
                        upsertConfig: {
                            debounceTime: 500,
                        },
                        controls: [
                            {
                                id: crypto.randomUUID(),
                                name: "title",
                                valueTemplateKey: APFormDefaultTemplateKeys.TEXT_FIELD,
                                value: title,
                                options: {
                                    label: "Название сайта",
                                    maxLength: 30,
                                },
                            },
                            {
                                id: crypto.randomUUID(),
                                name: "campaignName",
                                valueTemplateKey: APFormDefaultTemplateKeys.TEXT_FIELD,
                                value: campaignName,
                                options: {
                                    maxLength: 30,
                                    label: "Название вашей компании",
                                },
                            },

                            {
                                id: crypto.randomUUID(),
                                name: "testArea",
                                valueTemplateKey: APFormDefaultTemplateKeys.TEXTAREA_FIELD,
                                value: "My best description",
                                options: {
                                    maxLength: 300,
                                    label: "Описание вашей компании",
                                },
                            },

                            {
                                id: crypto.randomUUID(),
                                name: "testArea",
                                valueTemplateKey: APFormDefaultTemplateKeys.TEXTAREA_FIELD,
                                value: "My best keywords",
                                options: {
                                    maxLength: 300,
                                    label: "Ключевые слова для вашего сайта",
                                },
                            },
                        ],
                    };
                }),
            );
    }

    public selectFormModelChange(): Observable<PageSettings> {
        return this.formsManager.valueChanges("globalSettings").pipe(
            distinctUntilChanged((previous, current) => isObjectEquals(previous, current)),
            tap(value => this.updatePageSettings(value)),
        );
    }

    private updatePageSettings(value: PageSettings): void {
        this.service.updateState(state => {
            return {
                settings: {
                    ...state.settings,
                    ...value,
                },
            };
        });
    }
}
