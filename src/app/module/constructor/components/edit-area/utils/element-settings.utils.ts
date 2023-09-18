import { APFormModel } from "@components/ui";
import { Direction } from "@components/ui/controls/direction-field/types";
import { ElementSettingsWithUnit, SitePageElementUnion } from "@modules/constructor/components/edit-area/types";
import { SectionPageElement } from "@modules/constructor/components/edit-area/component/section/types";
import { SitePageElementType, StyleUnit } from "@modules/constructor/components/edit-area/enums";
import { TitlePageElement } from "@modules/constructor/components/edit-area/component/title/types";
import { getSectionSettings, getTitleSettings } from "./elements";
import { styleUnitMap } from "@modules/constructor/components/edit-area/constants";

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
    }
}

export function processSettingValueWithUnit(settingsValue: ElementSettingsWithUnit): string {
    const { value, unit } = settingsValue;
    const convertedUnit = styleUnitMap[unit];

    return `${value}${convertedUnit}`;
}

export function processDirectionValue(settingsValue?: Direction): string {
    const { top = 0, left = 0, unit = StyleUnit.PX, right = 0, bottom = 0 } = settingsValue ?? {};

    return `${processSettingValueWithUnit({ value: top, unit })} ${processSettingValueWithUnit({ value: right, unit })} ${processSettingValueWithUnit(
        { value: bottom, unit },
    )} ${processSettingValueWithUnit({ value: left, unit })}`;
}
