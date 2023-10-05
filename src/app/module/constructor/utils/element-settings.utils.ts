import { APFormModel, Direction } from "@components";
import {
    ElementSettingsWithUnit,
    ImagePageElement,
    InnerPageElement,
    SectionPageElement,
    SitePageElementType,
    SitePageElementUnion,
    StyleUnit,
    TitlePageElement,
    getImageSettings,
    getInnerSettings,
    getSectionSettings,
    getTitleSettings,
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

        case SitePageElementType.INNER: {
            return getInnerSettings(element as InnerPageElement);
        }

        case SitePageElementType.IMAGE: {
            return getImageSettings(element as ImagePageElement);
        }
    }
}

export function processSettingValueWithUnit(settingsValue?: ElementSettingsWithUnit): string {
    const { value = 0, unit = StyleUnit.PX } = settingsValue ?? {};
    const convertedUnit = styleUnitMap[unit];

    return `${value}${convertedUnit}`;
}

export function processDirectionValue(settingsValue?: Direction): string {
    const { top = 0, left = 0, unit = StyleUnit.PX, right = 0, bottom = 0 } = settingsValue ?? {};

    return `${processSettingValueWithUnit({ value: top, unit })} ${processSettingValueWithUnit({ value: right, unit })} ${processSettingValueWithUnit(
        { value: bottom, unit },
    )} ${processSettingValueWithUnit({ value: left, unit })}`;
}
