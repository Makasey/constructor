export interface UIState<T> {
    readonly ui: T;
}

export type SimpleMap<T> = Readonly<Record<string, T>>;
