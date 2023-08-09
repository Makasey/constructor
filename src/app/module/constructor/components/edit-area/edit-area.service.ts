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
    ROOT_ELEMENT_ID,
    SitePageElement,
    SitePageElementSettings,
    SitePageElementType,
    defaultPageElementSettingsMap,
    deleteElementFromTree,
    isObjectEquals,
} from "@modules/constructor/components/edit-area/types";
import { arrayAdd, arrayRemove, logAction } from "@datorama/akita";

@Injectable()
export abstract class AbstractEditAreaService {
    public abstract selectElement(id: number): Observable<SitePageElement>;

    public abstract getElement(id: number): SitePageElement;

    public abstract addElement(type: SitePageElementType, parentId?: number): void;

    public abstract deleteElement(elementId: number): void;

    public abstract updateSelection(elementId: number): void;

    public abstract selectSelectedElement(): Observable<number>;

    public abstract selectFormModel(): Observable<APFormModel>;

    public abstract selectSettings<K>(id: number, project: (settings: SitePageElementSettings) => K): Observable<K>;

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

    public addElement(type: SitePageElementType, parentId?: number): void {
        this.service.updateState(state => {
            const newElementID = this.getStoreElement("currentStateIndex") + 1;
            parentId = parentId ?? state.selectedElement;

            logAction(`Add element with id: ${newElementID}`);
            const items = state.items;
            const parentElement = items[parentId];
            const newElement: SitePageElement = {
                ...defaultPageElementSettingsMap[type],
                id: newElementID,
                parentId: parentId,
                settings: {
                    ...defaultPageElementSettingsMap[type].settings,
                    height: {
                        unit: parentElement.settings.height.unit,
                        value: parentElement.settings.height.value - 20,
                    },
                },
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

    public deleteElement(elementId: number): void {
        logAction(`Delete element with id: ${elementId}`, [], { id: elementId });

        this.service.updateState(state => {
            let items = { ...state.items };
            const { parentId } = items[elementId];

            if (!parentId) {
                return state;
            }

            const parentElement = items[parentId];

            items = deleteElementFromTree(state.items, elementId);

            return {
                currentStateIndex: state.currentStateIndex === elementId ? elementId - 1 : state.currentStateIndex,
                items: {
                    ...items,
                    [parentId]: {
                        ...parentElement,
                        children: arrayRemove<number[], number>(parentElement.children, item => item === elementId),
                    },
                },
                selectedElement: state.selectedElement === elementId ? parentId : ROOT_ELEMENT_ID,
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
                selectedElement: shouldDeselectItem ? ROOT_ELEMENT_ID : elementId,
            };
        });
    }

    public selectSelectedElement(): Observable<number> {
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

    public selectSettings<K>(id: number, project: (settings: SitePageElementSettings) => K): Observable<K> {
        return this.query.select(state => state.items[id].settings).pipe(map(settings => project(settings)));
    }
}
