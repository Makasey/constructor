import { InjectionToken, Type, ViewContainerRef } from "@angular/core";
import { RootComponent, SectionComponent, TitleComponent } from "@modules/constructor";
import { isObject } from "@datorama/akita";

export const ROOT_ELEMENT_ID = 1;

export enum SitePageElementType {
    PAGE = "page",
    TITLE = "title",
    SECTION = "section",
}

export enum StyleUnit {
    PERCENT = "percent",
    PX = "px",
}

export const styleUnitMap: Record<StyleUnit, string> = {
    [StyleUnit.PX]: StyleUnit.PX,
    [StyleUnit.PERCENT]: "%",
};

export const ELEMENT_ID = new InjectionToken<number>("ELEMENT_ID", {
    factory() {
        return ROOT_ELEMENT_ID;
    },
});

export const PARENT_ID = new InjectionToken<number>("PARENT_ID");

export type SitePageElement = Readonly<{
    id: number;
    parentId: number | null;
    type: SitePageElementType;
    isExtendable: boolean;
    children: number[];
    settings: SitePageElementSettings;
}>;

export type SitePageElementSettings = Readonly<{
    width: ElementSettingsWithUnit;
    height: ElementSettingsWithUnit;
    text?: string;
}>;

export type ElementSettingsWithUnit = Readonly<{
    value: number;
    unit: StyleUnit;
}>;

export type PageSettings = Readonly<{
    title: string;
    campaignName: string;
    siteMetaTags: string;
    siteDescription: string;
    id?: number;
}>;

export const sitePageElementMap: Record<SitePageElementType, Type<unknown>> = {
    [SitePageElementType.TITLE]: TitleComponent,
    [SitePageElementType.PAGE]: RootComponent,
    [SitePageElementType.SECTION]: SectionComponent,
};

export const defaultPageElementSettingsMap: Record<SitePageElementType, Omit<SitePageElement, "id" | "parentId">> = {
    [SitePageElementType.TITLE]: {
        type: SitePageElementType.TITLE,
        children: [],
        isExtendable: false,
        settings: {
            width: {
                value: 100,
                unit: StyleUnit.PERCENT,
            },
            height: {
                value: 20,
                unit: StyleUnit.PERCENT,
            },
        },
    },
    [SitePageElementType.SECTION]: {
        type: SitePageElementType.SECTION,
        children: [],
        isExtendable: false,
        settings: {
            width: {
                value: 100,
                unit: StyleUnit.PERCENT,
            },
            height: {
                value: 200,
                unit: StyleUnit.PX,
            },
        },
    },
    [SitePageElementType.PAGE]: {
        type: SitePageElementType.PAGE,
        children: [],
        isExtendable: false,
        settings: {
            width: {
                value: 100,
                unit: StyleUnit.PERCENT,
            },
            height: {
                value: 100,
                unit: StyleUnit.PERCENT,
            },
        },
    },
};

export interface ComponentWithVCR {
    readonly viewContainerRef: ViewContainerRef;

    readonly container: ViewContainerRef;
}

export function processSettingValueWithUnit(settingsValue: ElementSettingsWithUnit): string {
    const { value, unit } = settingsValue;
    const convertedUnit = styleUnitMap[unit];

    return `${value}${convertedUnit}`;
}

export function isObjectEquals<T = Record<string, unknown>>(target: T, other: T): boolean {
    if ((!isObject(target) && isObject(other)) || (isObject(target) && !isObject(other))) {
        return false;
    }

    if (!isObject(target) && !isObject(other)) {
        return target === other;
    }

    return Object.keys(target as Record<string, unknown>).every(key => {
        const targetItem = target[key];
        const otherItem = other[key];

        if (isObject(targetItem) && isObject(otherItem)) {
            return isObjectEquals(targetItem, otherItem);
        }

        if (Array.isArray(targetItem) && Array.isArray(otherItem)) {
            return (
                targetItem.length === otherItem.length &&
                targetItem.every(element => !!otherItem.find(otherElement => isObjectEquals(element, otherElement)))
            );
        }

        return targetItem === otherItem;
    });
}

export function deleteElementFromTree(items: Record<string, SitePageElement>, element: number): Record<string, SitePageElement> {
    const { id, children } = items[element];

    let itemsCopy = { ...items };

    children.forEach(child => {
        itemsCopy = deleteElementFromTree(itemsCopy, child);
    });

    delete itemsCopy[id];

    return itemsCopy;
}
