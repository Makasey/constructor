import { StyleUnit } from "@modules/constructor/components/edit-area/enums";

export type Direction = {
    top: number;
    bottom: number;
    left: number;
    right: number;
    unit: StyleUnit;
};

export const defaultDirectionValue: Direction = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    unit: StyleUnit.PX,
};
