import {
    AbstractEditorElementSettingsService,
    EDITOR_SELECTED_ELEMENT,
    ElementButton,
    SitePageElement,
    SitePageElementSettingsUnion,
    SitePageElementType,
    possibleSiteElementsMap,
} from "@modules/constructor";
import { DestroyRef, Injector, Signal, WritableSignal, effect, inject, runInInjectionContext, signal } from "@angular/core";
import { Subscription, tap } from "rxjs";
import { Tree } from "@components/ui/tree/tree.component";
import { arrayAdd } from "@datorama/akita";
import { assertInjector } from "@modules/constructor/utils/assert-injector";
import { getRandomId } from "@shared-utils";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

export function deleteElementFromTree(
    items: Record<string, SitePageElement>,
    element: string,
    itemsToRemove: string[] = [],
): { items: Record<string, SitePageElement>; itemsToRemove: string[] } {
    const { id, children } = items[element];

    itemsToRemove.push(id);

    let itemsCopy = { ...items };

    children.forEach(child => {
        itemsToRemove.push(child);

        const { items, itemsToRemove: removedItems } = deleteElementFromTree(itemsCopy, child, itemsToRemove);

        itemsCopy = items;
        itemsToRemove = removedItems;
    });

    delete itemsCopy[id];

    return { items: itemsCopy, itemsToRemove };
}

export function duplicateTreeElement(
    items: Record<string, SitePageElement>,
    targetElement: SitePageElement,
    parentId: string,
    newElementId: string | null = null,
): Record<string, SitePageElement> {
    const queue = [targetElement];
    let itemId: string | null = newElementId ?? getRandomId();
    const parentCache = {
        [targetElement.parentId!]: parentId,
    };

    while (queue.length) {
        const duplicatedElement = queue.shift()!;
        const newElementId = itemId ?? getRandomId();
        const parentId = parentCache[duplicatedElement.parentId!];

        const newElement = {
            ...duplicatedElement,
            children: [],
            parentId: parentId,
            id: newElementId,
        } as SitePageElement;

        parentCache[duplicatedElement.id] = newElement.id;

        items = {
            ...items,
            [parentId]: {
                ...items[parentId],
                children: arrayAdd(items[parentId].children, newElementId),
            },
            [newElementId]: newElement,
        };

        duplicatedElement.children.forEach(child => {
            queue.push(items[child]);
        });

        itemId = null;
    }

    return items;
}

export function processPossibleElements(type: SitePageElementType): ElementButton[] {
    switch (type) {
        // case SitePageElementType.PAGE: {
        //     return possibleSiteElementsMap[SitePageElementType.INNER];
        // }
        //
        // case SitePageElementType.SECTION: {
        //     return possibleSiteElementsMap[SitePageElementType.SECTION];
        // }
        //
        // case SitePageElementType.INNER: {
        //     return possibleSiteElementsMap[SitePageElementType.INNER];
        // }
        //
        // case SitePageElementType.TABS_ITEM: {
        //     return possibleSiteElementsMap[SitePageElementType.TABS_ITEM];
        // }
        //
        // case SitePageElementType.ACCORDION_ITEM: {
        //     return possibleSiteElementsMap[SitePageElementType.ACCORDION_ITEM];
        // }

        default: {
            return possibleSiteElementsMap[SitePageElementType.INNER];
        }
    }
}

export function mapElementsToTreeModel(items: Record<string, SitePageElement>, element: string): Tree {
    const { id, children, type } = items[element];

    return {
        value: id,
        label: type,
        children: children.map(child => {
            return mapElementsToTreeModel(items, child);
        }),
    };
}

export function provideElementSettings<TElementSettings extends SitePageElementSettingsUnion>(
    element?: Signal<string>,
    injector?: Injector,
): Signal<TElementSettings> {
    injector = assertInjector(provideElementSettings, injector);

    return runInInjectionContext(injector, () => {
        const selectedElement = element ?? inject(EDITOR_SELECTED_ELEMENT);
        const elementSettingsService = inject<AbstractEditorElementSettingsService<TElementSettings>>(AbstractEditorElementSettingsService);
        const destroyRef = inject(DestroyRef);
        const resultSignal: WritableSignal<TElementSettings> = signal({} as TElementSettings);

        let subscription: Subscription | null = null;

        effect(() => {
            const elementId = selectedElement();

            if (subscription) {
                subscription.unsubscribe();
                subscription = null;
            }

            subscription = elementSettingsService
                .selectSettings(elementId)
                .pipe(
                    tap(settings => resultSignal.set(settings)),
                    takeUntilDestroyed(destroyRef),
                )
                .subscribe();
        });

        return resultSignal;
    });
}
