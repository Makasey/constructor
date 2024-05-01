export type PaginationListItems<T> = Readonly<{
    items: T[];
    count: number;
}>;

export type ResponseError = Readonly<{
    error: {
        messages?: string[];
    };
}>;
