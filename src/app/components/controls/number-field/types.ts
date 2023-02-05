export type APNumberFieldValueChangeEvent = {
  newValue: number;
  oldValue: number;
}

export const defaultAPNumberFieldOptions = {
    label: "",
    placeholder: "",
    disabled: "",
    maxLength: 15,
    min: -9007199254740991,
    max: 9007199254740991,
};
