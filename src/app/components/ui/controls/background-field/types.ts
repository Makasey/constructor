import { BackgroundType, ObjectFitPosition } from "@modules/constructor";

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
