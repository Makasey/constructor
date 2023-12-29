import { APFormModel, BackgroundFieldModel, BorderFieldModel, Direction } from "@components";
import {
    BorderType,
    Directions,
    ElementSettingsWithUnit,
    ImagePageElement,
    InnerPageElement,
    ObjectFit,
    ObjectFitPosition,
    SectionPageElement,
    SitePageElementType,
    SitePageElementUnion,
    SpacerPageElement,
    StyleUnit,
    TabsItemPageElement,
    TabsPageElement,
    TextPageElement,
    TitlePageElement,
    getImageSettings,
    getInnerSettings,
    getSectionSettings,
    getSpacerElementSettings,
    getTabsItemSettings,
    getTabsSettings,
    getTextSettings,
    getTitleSettings,
    objectFitMap,
    objectFitPositionMap,
    styleUnitMap,
} from "@modules/constructor";

export function processElementSettings<T extends SitePageElementUnion>(type: SitePageElementType, element: T): APFormModel {
    switch (type) {
        case SitePageElementType.SECTION: {
            return getSectionSettings(element as SectionPageElement);
        }

        case SitePageElementType.PAGE: {
            return getSectionSettings(element as SectionPageElement);
        }

        case SitePageElementType.TITLE: {
            return getTitleSettings(element as TitlePageElement);
        }

        case SitePageElementType.TEXT: {
            return getTextSettings(element as TextPageElement);
        }

        case SitePageElementType.INNER: {
            return getInnerSettings(element as InnerPageElement);
        }

        case SitePageElementType.IMAGE: {
            return getImageSettings(element as ImagePageElement);
        }

        case SitePageElementType.TABS: {
            return getTabsSettings(element as TabsPageElement);
        }

        case SitePageElementType.TABS_ITEM: {
            return getTabsItemSettings(element as TabsItemPageElement);
        }

        case SitePageElementType.SPACER: {
            return getSpacerElementSettings(element as SpacerPageElement);
        }

        default: {
            return {} as APFormModel;
        }
    }
}

export function processSettingValueWithUnit(settingsValue?: ElementSettingsWithUnit): string {
    const { value = 0, unit = StyleUnit.PX } = settingsValue ?? {};
    const convertedUnit = styleUnitMap[unit];

    return `${value}${convertedUnit}`;
}

export function processObjectFitValue(objectFit: ObjectFit): string {
    return objectFitMap[objectFit];
}

export function processObjectFitPositionValue(objectFitPosition: ObjectFitPosition): string {
    return objectFitPositionMap[objectFitPosition];
}

export function processDirectionValue(settingsValue?: Direction): string {
    const { top = 0, left = 0, unit = StyleUnit.PX, right = 0, bottom = 0 } = settingsValue ?? {};

    return `${processSettingValueWithUnit({ value: top, unit })} ${processSettingValueWithUnit({ value: right, unit })} ${processSettingValueWithUnit(
        { value: bottom, unit },
    )} ${processSettingValueWithUnit({ value: left, unit })}`;
}

export function processBackgroundValue(settings: BackgroundFieldModel): string {
    const { image = {}, color = "transparent" } = settings;
    const { size = "unset", src = "", repeat = "no-repeat", position = ObjectFitPosition.CENTER_CENTER } = image;
    const processedPosition = processObjectFitPositionValue(position);
    const processedURL = src ? `${repeat} ${processedPosition} / ${size} url(${src})` : "";
    return `${color} ${processedURL}`;
}

export function processBorderValue(width: string = "0px", type: BorderType = BorderType.NONE, color: string = "#000000"): string {
    return `${width} ${type} ${color}`;
}

export function processBorderSideData(settings: BorderFieldModel, direction: Directions): string {
    const { borderType } = settings;

    if (borderType !== BorderType.NONE) {
        const { borderColor, borderWidth } = settings;
        const width = processSettingValueWithUnit({ value: borderWidth[direction], unit: borderWidth.unit });

        return processBorderValue(width, borderType, borderColor);
    } else {
        return processBorderValue();
    }
}
