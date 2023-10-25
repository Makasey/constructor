export type ControlItem = Readonly<{
    [key: string]: unknown;
    id: string;
    duplicatedId?: string;
    title: string;
}>;
