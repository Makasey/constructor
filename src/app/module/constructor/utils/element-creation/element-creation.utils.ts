import {
    AccordionItemPageElement,
    AccordionItemPageElementSettings,
    AccordionPageElement,
    AccordionPageElementSettings,
    SitePageElementSettingsUnion,
    SitePageElementType,
    SitePageElementUnion,
    TabsItemPageElement,
    TabsItemPageElementSettings,
    TabsPageElement,
    TabsPageElementSettings,
    defaultPageElementSettingsMap,
    deleteElementFromTree,
    duplicateTreeElement,
} from "@modules/constructor";
import { EditorState } from "@core";
import { arrayAdd, logAction } from "@datorama/akita";
import { getRandomId } from "@shared-utils";

export function getNewElement<T extends SitePageElementUnion>(type: SitePageElementType, parentId: string): T {
    const newElementID = getRandomId();
    logAction(`Add element with id: ${newElementID}, type: ${type}`);
    const defaultElementData = defaultPageElementSettingsMap[type]();
    return {
        ...defaultElementData,
        id: newElementID,
        parentId: parentId,
        settings: {
            ...defaultElementData.settings,
        },
    } as T;
}

export function processElementCreation(
    type: SitePageElementType,
    items: Record<string, SitePageElementUnion>,
    parentId: string,
): Partial<EditorState> {
    switch (type) {
        case SitePageElementType.TABS: {
            const newElement = getNewElement<TabsPageElement>(type, parentId);
            const parentElement = items[newElement.parentId!];

            const tabItems: TabsItemPageElement[] = Array.from({ length: newElement.settings.count }).map(() =>
                getNewElement(SitePageElementType.TABS_ITEM, newElement.id),
            );
            const childrenIds = tabItems.map(item => item.id);
            const updatedItems = tabItems.reduce((result, item) => {
                result[item.id] = item;

                return result;
            }, items);

            const updatedElement: TabsPageElement = {
                ...newElement,
                settings: {
                    ...newElement.settings,
                    items: tabItems.map(tabItem => {
                        return {
                            ...tabItem.settings,
                            id: tabItem.id,
                        };
                    }),
                    selectedElement: tabItems[0].id,
                },
                children: arrayAdd(newElement.children, childrenIds),
            };

            return {
                selectedElement: tabItems[0].id,
                items: {
                    ...updatedItems,
                    [parentId]: {
                        ...parentElement,
                        children: arrayAdd(parentElement.children, newElement.id),
                    },
                    [newElement.id]: updatedElement,
                },
            };
        }

        case SitePageElementType.ACCORDION: {
            const newElement = getNewElement<AccordionPageElement>(type, parentId);
            const parentElement = items[newElement.parentId!];

            const accordionItems: AccordionItemPageElement[] = Array.from({ length: newElement.settings.count }).map(() =>
                getNewElement(SitePageElementType.ACCORDION_ITEM, newElement.id),
            );

            const childrenIds = accordionItems.map(item => item.id);
            const updatedItems = accordionItems.reduce((result, item) => {
                result[item.id] = item;

                return result;
            }, items);

            const updatedElement: AccordionPageElement = {
                ...newElement,
                settings: {
                    ...newElement.settings,
                    items: accordionItems.map(accordionItem => {
                        return {
                            ...accordionItem.settings,
                            id: accordionItem.id,
                        };
                    }),
                    selectedElement: accordionItems[0].id,
                },
                children: arrayAdd(newElement.children, childrenIds),
            };

            return {
                selectedElement: accordionItems[0].id,
                items: {
                    ...updatedItems,
                    [parentId]: {
                        ...parentElement,
                        children: arrayAdd(parentElement.children, newElement.id),
                    },
                    [newElement.id]: updatedElement,
                },
            };
        }

        default: {
            const newElement = getNewElement(type, parentId);
            const parentElement = items[newElement.parentId!];

            return {
                selectedElement: newElement.id,
                items: {
                    ...items,
                    [parentId]: {
                        ...parentElement,
                        children: arrayAdd(parentElement.children, newElement.id),
                    },
                    [newElement.id]: newElement,
                },
            };
        }
    }
}

export function processUpdateElementSettings<K extends SitePageElementSettingsUnion>(
    value: K | Partial<K>,
    state: EditorState,
    id: string,
): Partial<EditorState> {
    const { items } = state;
    const item = items[id];

    switch (item.type) {
        case SitePageElementType.TABS: {
            const children = item.children;
            const updatedSettings = value as TabsPageElementSettings;

            if (updatedSettings.items) {
                const lengthDifference = updatedSettings.items.length - children.length;

                if (lengthDifference === -1) {
                    const newIds = updatedSettings.items.map(item => item.id);
                    const deletedItemId: string = children.find(child => !newIds.includes(child))!;
                    const updatedChildren: TabsItemPageElement[] = updatedSettings.items.map(({ id, ...settings }) => {
                        const childItem = items[id!] as TabsItemPageElement;

                        return {
                            ...childItem,
                            settings: {
                                ...childItem.settings,
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
                    const updatedChildren: TabsItemPageElement[] = updatedSettings.items.map(({ id, duplicatedId, ...settings }) => {
                        const childItem = items[id!] as TabsItemPageElement;

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
                                            const elementSettings = updatedTree[child].settings as TabsItemPageElementSettings;

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

                    const processedItem: TabsItemPageElement = {
                        ...(defaultPageElementSettingsMap[SitePageElementType.TABS_ITEM]() as TabsItemPageElement),
                        id: newItemID!,
                        parentId: item.id,
                    };

                    const updatedChildren: TabsItemPageElement[] = updatedSettings.items.map(({ id, ...settings }) => {
                        const childItem = (items[id!] ?? processedItem) as TabsItemPageElement;

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

                const processedChildren: TabsItemPageElement[] = children.map(children => {
                    const childItem = items[children] as TabsItemPageElement;

                    if (updatedSettings.items) {
                        const updatedElement = updatedSettings.items.find(updatedItem => updatedItem.id === children)!;
                        const updatedChildSettings: TabsItemPageElementSettings = {
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

        case SitePageElementType.TABS_ITEM: {
            const parentId = item.parentId!;
            const parentElement = items[parentId] as TabsPageElement;

            const processParentElement = parentElement.settings.items.map(element => {
                if (element.id !== id) {
                    return element;
                }

                return {
                    ...element,
                    ...value,
                };
            });

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
                    [parentId]: {
                        ...parentElement,
                        settings: {
                            ...parentElement.settings,
                            items: processParentElement,
                        },
                    },
                },
            };
        }

        case SitePageElementType.ACCORDION: {
            const children = item.children;
            const updatedSettings = value as AccordionPageElementSettings;

            if (updatedSettings.items) {
                const lengthDifference = updatedSettings.items.length - children.length;

                if (lengthDifference === -1) {
                    const newIds = updatedSettings.items.map(item => item.id);
                    const deletedItemId: string = children.find(child => !newIds.includes(child))!;
                    const updatedChildren: AccordionItemPageElement[] = updatedSettings.items.map(({ id, ...settings }) => {
                        const childrenItem = items[id!] as AccordionItemPageElement;

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
                    const updatedChildren: AccordionItemPageElement[] = updatedSettings.items.map(({ id, duplicatedId, ...settings }) => {
                        const childItem = items[id!] as AccordionItemPageElement;

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
                                            const elementSettings = updatedTree[child].settings as TabsItemPageElementSettings;

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

                    const processedItem: AccordionItemPageElement = {
                        ...(defaultPageElementSettingsMap[SitePageElementType.ACCORDION_ITEM]() as AccordionItemPageElement),
                        id: newItemID!,
                        parentId: item.id,
                    };

                    const updatedChildren: AccordionItemPageElement[] = updatedSettings.items.map(({ id, ...settings }) => {
                        const childItem = (items[id!] ?? processedItem) as TabsItemPageElement;

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

                const processedChildren: AccordionItemPageElement[] = children.map(children => {
                    const childItem = items[children] as AccordionItemPageElement;

                    if (updatedSettings.items) {
                        const updatedElement = updatedSettings.items.find(updatedItem => updatedItem.id === children)!;
                        const updatedChildSettings: AccordionItemPageElementSettings = {
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

        case SitePageElementType.ACCORDION_ITEM: {
            const parentId = item.parentId!;
            const parentElement = items[parentId] as AccordionPageElement;

            const processParentElement = parentElement.settings.items.map(element => {
                if (element.id !== id) {
                    return element;
                }

                return {
                    ...element,
                    ...value,
                };
            });

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
                    [parentId]: {
                        ...parentElement,
                        settings: {
                            ...parentElement.settings,
                            items: processParentElement,
                        },
                    },
                },
            };
        }

        default: {
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
    }
}
