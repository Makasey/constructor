import { BorderType } from "@modules/constructor";
import { Direction, defaultDirectionValue } from "@components";

export type BorderFieldModel = Readonly<{
    borderRadius: Direction;
    borderType: BorderType;
    borderWidth: Direction;
    borderColor: string;
}>;

export const defaultBorderData = {
    borderWidth: {
        ...defaultDirectionValue,
    },
    borderRadius: {
        ...defaultDirectionValue,
    },
    borderColor: "#000000",
    borderType: BorderType.NONE,
};
