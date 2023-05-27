export interface UIState<T> {
    readonly ui: T;
}

export type SimpleMap<T> = Readonly<Record<string, T>>;

export type ItemsWithId<T> = Readonly<{
    items: T[];
    id: number;
}>;
