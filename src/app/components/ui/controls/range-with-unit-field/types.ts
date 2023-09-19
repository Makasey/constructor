import { StyleUnit } from "@modules/constructor/components/edit-area/enums";

export type RangeWithUnit = {
    value: number;
    unit: StyleUnit;
};

export const defaultRangeWithUnitValue: RangeWithUnit = {
    value: 0,
    unit: StyleUnit.PX,
};
