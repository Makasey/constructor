export type Coordinates = Readonly<{
    x: number;
    y: number;
}>;

export type RectangleCoordinates = Readonly<
    {
        width: number;
        height: number;
    } & Coordinates
>;

export type DragArea<T = string> = Readonly<{ container: HTMLElement; name: string; id: T }>;

export type LZDropEvent<TId = string, TData = unknown> = Readonly<
    {
        data: TData;
    } & DragArea<TId>
>;
