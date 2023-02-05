
export type APTextFieldValueChangeEvent = {
  newValue: string;
  oldValue: string;
}

export const defaultAPTextFieldOptions = {
    label: "Text Field",
    placeholder: "",
    disabled: false,
    maxLength: 16,
    minLength: 0,
};
