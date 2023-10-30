import { BackgroundType, ObjectFitPosition } from "@modules/constructor/enums";

export type BackgroundFieldModel = Readonly<{
    backgroundType: BackgroundType;
    color?: string;
    image?: {
        src?: string;
        fileId?: number;
        repeat?: string;
        position?: ObjectFitPosition;
        size?: string;
    };
}>;
