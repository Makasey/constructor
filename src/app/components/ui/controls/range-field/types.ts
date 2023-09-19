import { StyleUnit } from "@modules/constructor/components/edit-area/enums";

export type Range = {
    value: number;
    unit: StyleUnit;
};

export const defaultRangeValue: Range = {
    value: 0,
    unit: StyleUnit.PX,
};
