import {
    AbstractDragService,
    AbstractEditorOperationService,
    SitePageElement,
    SitePageElementType,
    StyleUnit,
    deleteElementFromTree,
    duplicateTreeElement,
} from "@modules/constructor";
import { AbstractLzStoreService, LzAbstractQuery, LzQueryInjectionTokensMap, LzServiceInjectionTokensMap, LzStateKey } from "@core";
import { Inject, Injectable, inject } from "@angular/core";
import { Observable, map } from "rxjs";
import { RootElement } from "@modules/constructor/components/elements/root/types";
import { getRandomId } from "@shared-utils";

@Injectable()
export abstract class AbstractMultiPageOperationService extends AbstractEditorOperationService {
    protected constructor(
        protected query: LzAbstractQuery<LzStateKey.EDITOR_STATE>,
        protected service: AbstractLzStoreService<LzStateKey.EDITOR_STATE>,
    ) {
        super(query, service);
    }

    private readonly dragService = inject(AbstractDragService);

    public addPage(): void {
        this.service.updateState(() => {
            const items = this.getStoreElement("items");
            const pages = this.getStoreElement("pages");

            const newPage: RootElement = {
                id: getRandomId(),
                isExtendable: true,
                parentId: null,
                type: SitePageElementType.PAGE,
                settings: {
                    title: "My best page",
                    logotype: null,
                    siteDescription: "My best page",
                    siteMetaTags: "",
                    width: {
                        value: 1920,
                        unit: StyleUnit.PX,
                    },
                    height: {
                        value: 1080,
                        unit: StyleUnit.PX,
                    },
                },
                children: [],
            };
            const newPageId = newPage.id;

            return {
                items: {
                    ...items,
                    [newPage.id]: newPage,
                },
                pages: pages.concat(newPageId),
                selectedPage: newPageId,
            };
        });
    }

    public deletePageById(id: string): void {
        this.service.updateState(() => {
            const pages: string[] = this.getStoreElement("pages");

            if (pages.length > 1) {
                const updatePages: string[] = pages.filter(page => page !== id);

                const selectedPageId = updatePages[0];

                const items = this.getStoreElement("items");

                const updatedItems: Record<string, SitePageElement> = { ...items };

                const result = deleteElementFromTree(updatedItems, id);

                result.itemsToRemove.forEach(child => this.dragService.removeConnectedList(child));

                return {
                    items: result.items,
                    pages: updatePages,
                    selectedPage: selectedPageId,
                    selectedElement: selectedPageId,
                };
            }

            return;
        });
    }

    public copyPageById(id: string): void {
        this.service.updateState(() => {
            const pages: string[] = this.getStoreElement("pages");
            const items = this.getStoreElement("items");
            const element: RootElement = this.getElement(id);
            const newElementId = getRandomId();
            const result = duplicateTreeElement(items, element, null!, newElementId);

            const updatePages: string[] = pages.concat(newElementId);

            return {
                items: result,
                pages: updatePages,
                selectedPage: newElementId,
                selectedElement: newElementId,
            };
        });
    }

    public selectPages(): Observable<string[]> {
        return this.query.select(state => state.pages);
    }

    public updateSelectPage(id: string): void {
        this.service.updateState(() => {
            return {
                selectedPage: id,
                selectedElement: id,
            };
        });
    }

    public selectSelectedPage(): Observable<string> {
        return this.query.select(state => state.selectedPage);
    }

    public selectActivePage(): Observable<string> {
        return this.query
            .select(state => {
                return {
                    selectedPage: state.selectedPage,
                    pages: state.pages,
                };
            })
            .pipe(
                map(({ selectedPage, pages }) => {
                    return pages.find(page => page === selectedPage)!;
                }),
            );
    }
}

@Injectable()
export class MultiPageOperationService extends AbstractMultiPageOperationService {
    constructor(
        @Inject(LzQueryInjectionTokensMap[LzStateKey.EDITOR_STATE]) protected readonly query: LzAbstractQuery<LzStateKey.EDITOR_STATE>,
        @Inject(LzServiceInjectionTokensMap[LzStateKey.EDITOR_STATE]) protected readonly service: AbstractLzStoreService<LzStateKey.EDITOR_STATE>,
    ) {
        super(query, service);
    }
}
