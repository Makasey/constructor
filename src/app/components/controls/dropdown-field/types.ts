export type APDropdownFieldItem = {
  id: string;
  label: string;
  customData?: Record<string, unknown>;
}

export type APDropdownFieldValueChangeEvent = {
  newValue: APDropdownFieldItem[];
  oldValue: APDropdownFieldItem[] | null;
}
