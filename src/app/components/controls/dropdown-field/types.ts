export type APDropdownFieldItem = Readonly<{
    id: string;
    label: string;
    customData?: Record<string, unknown>;
}>;

export type ApDropdownFormControlOptions<T> = Readonly<{
    items: T[];
    label: string;
    placeholder?: string;
    disabled?: boolean;
    multi?: boolean;
}>;

export type APDropdownFieldValueChangeEvent = Readonly<{
    newValue: APDropdownFieldItem[];
    oldValue: APDropdownFieldItem[] | null;
}>;
