import { EditorState } from "@core";
import {
    SitePageElementSettingsUnion,
    SitePageElementType,
    SliderItemPageElement,
    SliderPageElementItemSettings,
    SliderPageElementSettings,
    defaultPageElementSettingsMap,
    deleteElementFromTree,
    duplicateTreeElement,
} from "@modules/constructor";
import { arrayAdd } from "@datorama/akita";

export function processUpdateSliderSettings<K extends SitePageElementSettingsUnion>(
    value: K | Partial<K>,
    state: EditorState,
    id: string,
): Partial<EditorState> {
    const { items } = state;
    const item = items[id];
    const children = item.children;

    const updatedSettings = value as SliderPageElementSettings;

    if (updatedSettings.items) {
        const lengthDifference = updatedSettings.items.length - children.length;

        if (lengthDifference === -1) {
            const newIds = updatedSettings.items.map(item => item.id);
            const deletedItemId: string = children.find(child => !newIds.includes(child))!;
            const updatedChildren: SliderItemPageElement[] = updatedSettings.items.map(({ id, ...settings }) => {
                const childrenItem = items[id!] as SliderItemPageElement;

                return {
                    ...childrenItem,
                    settings: {
                        ...childrenItem.settings,
                        ...settings,
                    },
                };
            });

            let updatedItems = updatedChildren.reduce((result, item) => {
                return {
                    ...result,
                    [item.id]: item,
                };
            }, items);

            updatedItems = deleteElementFromTree(updatedItems, deletedItemId);

            const processedChildrenSettings = updatedChildren.map(child => {
                return {
                    ...child.settings,
                    id: child.id,
                };
            });

            return {
                items: {
                    ...updatedItems,
                    [id]: {
                        ...item,
                        children: newIds as string[],
                        settings: {
                            ...item.settings,
                            ...updatedSettings,
                            items: processedChildrenSettings,
                        },
                    },
                },
            };
        }

        if (lengthDifference === 0) {
            const updatedChildren: SliderItemPageElement[] = updatedSettings.items.map(({ id, duplicatedId, ...settings }) => {
                const childItem = items[id!] as SliderItemPageElement;

                return {
                    ...childItem,
                    settings: {
                        ...childItem.settings,
                        ...settings,
                    },
                };
            });

            const updatedItems = updatedChildren.reduce((result, item) => {
                return {
                    ...result,
                    [item.id]: item,
                };
            }, items);

            return {
                items: {
                    ...updatedItems,
                    [id]: {
                        ...item,
                        settings: {
                            ...item.settings,
                            ...updatedSettings,
                            items: updatedChildren.map(child => {
                                return {
                                    ...child.settings,
                                    id: child.id,
                                };
                            }),
                        },
                    },
                },
            };
        }

        if (lengthDifference === 1) {
            const { id: newItemID, duplicatedId, ...settings } = updatedSettings.items.find(child => !children.includes(child.id!))!;

            if (duplicatedId) {
                const duplicatedItem = {
                    ...items[duplicatedId],
                    settings: {
                        ...items[duplicatedId],
                        ...settings,
                    },
                };

                const updatedTree = duplicateTreeElement(items, duplicatedItem, item.id, newItemID);

                return {
                    items: {
                        ...updatedTree,
                        [id]: {
                            ...updatedTree[id],
                            settings: {
                                ...updatedTree[id].settings,
                                ...updatedSettings,
                                items: updatedTree[id].children.map(child => {
                                    const elementSettings = updatedTree[child].settings as SliderPageElementItemSettings;

                                    return {
                                        ...elementSettings,
                                        id: child,
                                    };
                                }),
                            },
                        },
                    },
                };
            }

            const processedItem: SliderItemPageElement = {
                ...(defaultPageElementSettingsMap[SitePageElementType.SLIDER_ITEM]() as SliderItemPageElement),
                id: newItemID!,
                parentId: item.id,
            };

            const updatedChildren: SliderItemPageElement[] = updatedSettings.items.map(({ id, ...settings }) => {
                const childItem = (items[id!] ?? processedItem) as SliderItemPageElement;

                return {
                    ...childItem,
                    settings: {
                        ...childItem.settings,
                        ...settings,
                    },
                };
            });

            const updatedItems = updatedChildren.reduce((result, item) => {
                return {
                    ...result,
                    [item.id]: item,
                };
            }, items);

            return {
                items: {
                    ...updatedItems,
                    [id]: {
                        ...item,
                        children: arrayAdd(children, processedItem.id),
                        settings: {
                            ...item.settings,
                            ...updatedSettings,
                            items: updatedChildren.map(child => {
                                return {
                                    ...child.settings,
                                    id: child.id,
                                };
                            }),
                        },
                    },
                },
            };
        }

        const processedChildren: SliderItemPageElement[] = children.map(children => {
            const childItem = items[children] as SliderItemPageElement;

            if (updatedSettings.items) {
                const updatedElement = updatedSettings.items.find(updatedItem => updatedItem.id === children)!;
                const updatedChildSettings: SliderPageElementItemSettings = {
                    ...childItem.settings,
                    ...updatedElement,
                };

                return {
                    ...childItem,
                    settings: updatedChildSettings,
                };
            }

            return { ...childItem };
        });

        return {
            items: {
                ...items,
                [id]: {
                    ...item,
                    settings: {
                        ...item.settings,
                        ...updatedSettings,
                        items: processedChildren.map(child => {
                            return {
                                ...child.settings,
                                id: child.id,
                            };
                        }),
                    },
                },
            },
        };
    }

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
}
