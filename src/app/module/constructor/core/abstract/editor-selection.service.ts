import { AbstractLzStoreService, LzAbstractQuery, LzQueryInjectionTokensMap, LzServiceInjectionTokensMap, LzState, LzStateKey } from "@core";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { logAction } from "@datorama/akita";

@Injectable()
export abstract class AbstractEditorSelectionService {
    protected constructor(
        protected query: LzAbstractQuery<LzStateKey.EDITOR_STATE>,
        protected service: AbstractLzStoreService<LzStateKey.EDITOR_STATE>,
    ) {}

    public updateSelection(elementId: string): void {
        const selectedElement = this.getStoreElement("selectedElement");

        const shouldDeselectItem = elementId === selectedElement;

        if (shouldDeselectItem) {
            this.deselectElement(elementId);

            return;
        }

        this.selectElement(elementId);
    }

    protected selectElement(elementId: string): void {
        logAction(`Select element with id: ${elementId}`, [elementId]);

        this.service.updateState(() => {
            return {
                selectedElement: elementId,
            };
        });
    }

    protected deselectElement(elementId: string): void {
        logAction(`Deselect element with id: ${elementId}`, [elementId]);

        this.service.updateState(() => {
            return {
                selectedElement: this.getStoreElement("selectedPage"),
            };
        });
    }

    public selectSelectedElement(): Observable<string> {
        return this.query.select(state => state.selectedElement);
    }

    public tabSelection(currentId?: string, previousId?: string): void {
        const id = this.getStoreElement("selectedElement");
        const selectedPage = this.getStoreElement("selectedPage");
        const items = this.getStoreElement("items");
        const { children, parentId } = items[id];

        if (currentId === null) {
            this.service.updateState(() => {
                return {
                    selectedElement: selectedPage,
                };
            });

            return;
        }

        if (currentId && previousId) {
            const item = items[currentId];
            const itemIndex = item.children.findIndex(child => child === previousId);

            if (itemIndex === item.children.length - 1) {
                this.tabSelection(item.parentId!, item.id);

                return;
            }

            if (itemIndex < item.children.length - 1) {
                this.service.updateState(() => {
                    return {
                        selectedElement: item.children[itemIndex + 1],
                    };
                });

                return;
            }

            return;
        }

        if (children.length) {
            this.service.updateState(() => {
                return {
                    selectedElement: children[0],
                };
            });

            return;
        }

        if (id === selectedPage) {
            this.service.updateState(() => {
                return {
                    selectedElement: selectedPage,
                };
            });

            return;
        }

        const parent = items[parentId!];
        const itemIndex = parent.children.findIndex(child => child === id);

        if (itemIndex === parent.children.length - 1) {
            this.tabSelection(parent.parentId!, parent.id);

            return;
        }

        this.service.updateState(() => {
            return {
                selectedElement: parent.children[itemIndex + 1],
            };
        });
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
