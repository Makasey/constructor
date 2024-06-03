export interface UIState<T> {
    readonly ui: T;
}

export type SimpleMap<T> = Readonly<Record<string, T>>;

export type ItemsWithId<T> = Readonly<{
    items: T[];
    id: number;
}>;

export type ServerError = Readonly<{
    error?: ServerInnerError;
}>;

export type ServerInnerError = Readonly<{
    status: number;
    message: string;
}>;

export type Valuable<T> = {
    [K in keyof T as T[K] extends null | undefined ? never : K]: T[K];
};

export type SelectItem<Value = number, Label = string> = Readonly<{
    value: Value;
    label: Label;
    [key: string]: unknown;
}>;

export type ArrayOrIterable<T = unknown> = T[] | Iterable<T> | ArrayLike<T>;

export type Primitive = number | null | undefined | string | boolean | Symbol | bigint;

export type CollectItemFn<Source> = (sourceItem: Source) => Primitive;

export type CollectFnConfig<Source = unknown, Destination = Source> = Readonly<{
    source: Source[];
    destination: Destination[];
    sourceCollectFn?: CollectItemFn<Source>;
    destinationCollectFn?: CollectItemFn<Destination>;
}>