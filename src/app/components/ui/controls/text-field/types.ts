export type APTextFieldValueChangeEvent = {
    newValue: string;
    oldValue: string;
};

export type ApTextFormControlOptions = Readonly<{
    label: string;
    placeholder?: string;
    disabled?: boolean;
    maxLength?: number;
    minLength?: number;
}>;

export const defaultAPTextFieldOptions: ApTextFormControlOptions = {
    label: "Text Field",
    placeholder: "",
    disabled: false,
    maxLength: 16,
    minLength: 0,
};

export const defaultColorPikerOptions: ApTextFormControlOptions = {
    label: "Color field",
};
