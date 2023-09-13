import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewEncapsulation } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

import { APDropdownFieldItem, APDropdownFieldValueChangeEvent } from "./types";

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
export class APDropdownFieldComponent implements ControlValueAccessor, OnInit, OnChanges {
    @Input()
    public items: APDropdownFieldItem[] = [];

    @Input()
    public multi = false;

    @Input()
    public customClass: string;

    @Input()
    public set value(items: APDropdownFieldItem | APDropdownFieldItem[]) {
        if (!items) {
            items = [];
        }

        this._rawValue = items;

        this.processDropdownValue(this._rawValue);
    }

    @Input()
    public label = "";

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

    public _selectValueKey = "id";

    public _selectLabelKey = "label";

    public _rawValue: APDropdownFieldItem | APDropdownFieldItem[] = [];

    public _value: APDropdownFieldItem[];

    private onChange: (value: APDropdownFieldItem[]) => void = () => undefined;

    private onTouched: () => void;

    public _onDropdownItemChoose(item: APDropdownFieldItem): void {
        const oldValue = [...this._value];

        if (this.multi) {
            this.processMultiDropdownMode(item);
        } else {
            this.processSingleDropdownMode(item);

            this._onToggleDropdownListVisibility();
        }

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
        this.value = value;
    }

    public _onToggleDropdownListVisibility(event?: Event): void {
        event?.stopPropagation();
        this._isDropdownItemsVisible = !this._isDropdownItemsVisible;
    }

    public _onCloseDropdownList(event: MouseEvent): void {
        event.stopPropagation();

        this.touched = false;
        this.onTouched();
        this._isDropdownItemsVisible = false;
    }

    private processSingleDropdownMode(item: APDropdownFieldItem): void {
        this._value = [item];
    }

    private processMultiDropdownMode(item: APDropdownFieldItem): void {
        const index = this._value.findIndex((dropdownItem: APDropdownFieldItem) => dropdownItem[this._selectValueKey] === item[this._selectValueKey]);
        this._value =
            index === -1
                ? [...this._value, item]
                : this._value.filter(currentItem => currentItem[this._selectValueKey] !== item[this._selectValueKey]);
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.value || changes.items) {
            this.processDropdownValue(this._rawValue);
        }
    }

    public ngOnInit(): void {
        this.processDropdownValue(this._rawValue);
    }

    private processDropdownValue(value: APDropdownFieldItem | APDropdownFieldItem[]): void {
        if (Array.isArray(value) && value.length) {
            this._value = [...value];
        } else {
            const processedValue = this.items.filter(item => {
                const condition = item[this._selectValueKey] === value || item[this._selectValueKey] === value?.[this._selectValueKey];

                return condition;
            });

            this._value = processedValue.length ? processedValue : this.items.slice(0, 1);
        }
    }
}
