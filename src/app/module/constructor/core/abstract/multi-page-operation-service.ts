import {
    AbstractDragService,
    AbstractEditorOperationService,
    ROOT_ELEMENT_ID,
    SitePageElement,
    deleteElementFromTree,
    duplicateTreeElement,
} from "@modules/constructor";
import { AbstractLzStoreService, LzAbstractQuery, LzQueryInjectionTokensMap, LzServiceInjectionTokensMap, LzStateKey, Page } from "@core";
import { Inject, Injectable, inject } from "@angular/core";
import { Observable, map } from "rxjs";
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
            const pages: Page[] = this.getStoreElement("pages");

            const newPage: Page = {
                id: getRandomId(),
                settings: {
                    title: "My best page",
                    logotype: null,
                    siteDescription: "My best page",
                    siteMetaTags: "",
                },
                children: [],
            };
            const newPageId = newPage.id;

            return {
                pages: [...pages, newPage],
                selectedPage: newPageId,
            };
        });
    }

    public deletePageById(id: string): void {
        this.service.updateState(() => {
            const pages: Page[] = this.getStoreElement("pages");

            if (pages.length > 1) {
                const updatePages: Page[] = pages.filter(page => page.id !== id);

                const selectedPageId = updatePages[0].id;

                const items = this.getStoreElement("items");

                const children = pages.find(page => page.id === id)?.children[0] as string;

                let updatedItems: Record<string, SitePageElement> = { ...items };

                if (children) {
                    const result = deleteElementFromTree(items, children);
                    updatedItems = result.items;

                    result.itemsToRemove.forEach(child => this.dragService.removeConnectedList(child));
                }

                return {
                    items: updatedItems,
                    pages: updatePages,
                    selectedPage: selectedPageId,
                };
            }

            return;
        });
    }

    public copyPageById(id: string): void {
        this.service.updateState(() => {
            const pages: Page[] = this.getStoreElement("pages");
            const items = this.getStoreElement("items");

            const page: Page = pages.find(page => page.id === id)!;

            const pageCopy: Page = {
                ...page,
                id: getRandomId(),
                settings: {
                    ...page?.settings,
                    title: page?.settings.title + " копия",
                },
            };

            if (!page.children.length) {
                const pageCopyId = pageCopy.id;

                const updatePages = [...pages, pageCopy];

                return {
                    pages: updatePages,
                    selectedPage: pageCopyId,
                };
            }

            let updatedTree: Record<string, SitePageElement> = { ...items };
            const children: string[] = [];

            pageCopy.children.forEach(child => {
                const item = { ...items[child] };

                const duplicatedItem = {
                    ...item,
                };
                const newElementId = getRandomId();

                children.push(newElementId);

                updatedTree = {
                    ...updatedTree,
                    ...duplicateTreeElement(items, duplicatedItem, ROOT_ELEMENT_ID, newElementId),
                };
            });

            const updatePages: Page[] = [
                ...pages,
                {
                    ...pageCopy,
                    children: children,
                },
            ];

            return {
                items: updatedTree,
                pages: updatePages,
                selectedPage: pageCopy.id,
            };
        });
    }

    public selectPages(): Observable<Page[]> {
        return this.query.select(state => {
            return state.pages;
        });
    }

    public updateSelectPage(id: string): void {
        this.service.updateState(() => {
            return {
                selectedPage: id,
            };
        });
    }

    public selectSelectedPage(): Observable<string> {
        return this.query.select(state => state.selectedPage);
    }

    public selectActivePage(): Observable<Page> {
        return this.query
            .select(state => {
                return {
                    selectedPage: state.selectedPage,
                    pages: state.pages,
                };
            })
            .pipe(
                map(({ selectedPage, pages }) => {
                    return pages.find(page => page.id === selectedPage)!;
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
