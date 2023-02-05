export type PaginationListItems<T> = Readonly<{
    items: T[];
    count: number;
}>;

export const TOTAL_COUNT_HEADER = "X-TOTAL-COUNT";
