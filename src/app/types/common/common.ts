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
