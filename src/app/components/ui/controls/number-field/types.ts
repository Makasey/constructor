export type APNumberFieldValueChangeEvent = {
    newValue: number;
    oldValue: number;
};

export type ApNumberFormControlOptions = Readonly<{
    label: string;
    placeholder?: string;
    disabled?: boolean;
    min?: number;
    max?: number;
}>;

export const defaultAPNumberFieldOptions: ApNumberFormControlOptions = {
    label: "",
    placeholder: "",
    disabled: false,
    min: -9007199254740991,
    max: 9007199254740991,
};
