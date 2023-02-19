import { APDropdownFieldItem, APDropdownFieldValueChangeEvent } from "./types";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
    selector: "ap-dropdown-field",
    templateUrl: "./dropdown-field.component.html",
    styleUrls: ["./dropdown-field.component.scss"],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: APDropdownFieldComponent,
        },
    ],
})
export class APDropdownFieldComponent implements ControlValueAccessor {
    @Input()
    public items: APDropdownFieldItem[] = [];

    @Input()
    public multi = false;

    @Input()
    public set value(items: APDropdownFieldItem[] | APDropdownFieldItem) {
        if (!Array.isArray(items)) {
            this._value = [items];
        } else {
            this._value = items;
        }
    }

    @Input()
    public set selectValueKey(valueKey: string) {
        if (valueKey) {
            this._selectValueKey = valueKey;
        }
    }

    @Input()
    public set selectLabelKey(labelKey: string) {
        if (labelKey) {
            this._selectLabelKey = labelKey;
        }
    }

    @Output()
    public readonly onValueChange: EventEmitter<APDropdownFieldValueChangeEvent> = new EventEmitter<APDropdownFieldValueChangeEvent>();

    public _isDropdownItemsVisible = false;

    public disabled = false;

    public touched = false;

    public _selectValueKey: string = "id";

    public _selectLabelKey: string = "label";

    public _value: APDropdownFieldItem[] = [];

    private onChange: (value: APDropdownFieldItem[]) => void = () => undefined;

    private onTouched: () => void;

    public _onDropdownItemChoose(item: APDropdownFieldItem): void {
        const oldValue = [...this._value];

        this.multi ? this.processMultiDropdownMode(item) : this.processSingleDropdownMode(item);

        this.writeValue(this._value);
        this.onChange(this._value);
        this.onValueChange.emit({
            newValue: this._value,
            oldValue: oldValue,
        });
    }

    public _onDropdownFieldFocus(): void {
        this.touched = true;
        this.onTouched();
    }

    public registerOnChange(fn: (value: APDropdownFieldItem[]) => unknown): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: () => unknown): void {
        this.onTouched = fn;
    }

    public setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    public writeValue(value: APDropdownFieldItem | APDropdownFieldItem[]): void {
        this._value = Array.isArray(value) ? [...value] : [value];
    }

    public _onToggleDropdownListVisibility(event: Event): void {
        event.stopPropagation();

        this._isDropdownItemsVisible = !this._isDropdownItemsVisible;
    }

    public _onCloseDropdownList(): void {
        this.touched = false;
        this.onTouched();
        this._isDropdownItemsVisible = false;
    }

    private processSingleDropdownMode(item: APDropdownFieldItem): void {
        const index = this._value.findIndex((dropdownItem: APDropdownFieldItem) => dropdownItem[this._selectValueKey] === item[this._selectValueKey]);

        this._value = index === -1 ? [item] : [];
    }

    private processMultiDropdownMode(item: APDropdownFieldItem): void {
        const index = this._value.findIndex((dropdownItem: APDropdownFieldItem) => dropdownItem[this._selectValueKey] === item[this._selectValueKey]);
        this._value = index === -1 ? [...this._value, item] : this._value.filter(currentItem => currentItem[this._selectValueKey] !== item[this._selectValueKey]);
    }
}
