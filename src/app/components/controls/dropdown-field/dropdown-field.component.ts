import { APDropdownFieldItem, APDropdownFieldValueChangeEvent } from "./types";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewEncapsulation } from "@angular/core";
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
export class APDropdownFieldComponent implements OnChanges, ControlValueAccessor {
    @Input()
    public items: APDropdownFieldItem[] = [];

    @Input()
    public multi = false;

    @Input()
    public value: APDropdownFieldItem[] = [];

    @Output()
    public readonly onValueChange: EventEmitter<APDropdownFieldValueChangeEvent> = new EventEmitter<APDropdownFieldValueChangeEvent>();

    public _isDropdownItemsVisible = false;

    public _activeDropdownItems: APDropdownFieldItem[] = [];

    public _activeItems: { active: boolean; id: string; }[] = [];

    public disabled = false;

    public touched = false;

    public _value: APDropdownFieldItem[] | null = [];

    private onChange: (value: APDropdownFieldItem[]) => void = () => undefined;

    private onTouched: () => void;

    constructor(private changeDetectionRef: ChangeDetectorRef) {}

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.value) {
            const condition = Array.isArray(changes.value?.currentValue);
            this._value = condition ? changes.value?.currentValue : [];
            this._activeDropdownItems = Array.isArray(changes.value?.currentValue) ? changes.value.currentValue : [changes.value?.currentValue].filter(Boolean);

            this._activeItems = this.items.map(item => {
                return {
                    id: item.id,
                    active: !!this._value?.find(valueItem => valueItem.id === item.id),
                };
            });
        }
    }

    public _onDropdownItemChoose(item: APDropdownFieldItem): void {
        const itemIndex = this._activeDropdownItems.findIndex(dropdownItem => dropdownItem.id === item.id);
        const oldValue = this._activeDropdownItems.slice(0);

        if (this.multi) {
            const index = this._activeItems.findIndex(activeItem => activeItem.id === item.id);
            if (itemIndex === -1) {
                this._activeDropdownItems = [...this._activeDropdownItems, item];
                this._activeItems[index].active = true;
            } else {
                const copy = this._activeDropdownItems.slice(0);
                copy.splice(itemIndex, 1);
                this._activeItems[index].active = false;
                this._activeDropdownItems = copy;
            }
        } else {
            this._activeItems = this._activeItems.map(activeItem => {
                return activeItem.id === item.id
                    ? {
                        ...activeItem,
                        active: true,
                    }
                    : {
                        ...activeItem,
                        active: false,
                    };
            });
            itemIndex === -1 ? (this._activeDropdownItems = [item]) : (this._activeDropdownItems = []);
        }
        this.changeDetectionRef.detectChanges();
        this.writeValue(this._activeDropdownItems);
        const valueChangeEventValue = {
            newValue: this._activeDropdownItems,
            oldValue: oldValue,
        };
        this.onChange(this._activeDropdownItems);
        //control.setValue(valueChangeEventValue)
        this.onValueChange.emit(valueChangeEventValue);
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

    public writeValue(value: APDropdownFieldItem | APDropdownFieldItem[] | null): void {
        this._value = Array.isArray(value) ? value : value && [value];
    }

    public _onToggleDropdownListVisibility(event: Event): void {
        event.stopPropagation();

        this._isDropdownItemsVisible = !this._isDropdownItemsVisible;
    }

    public _onCloseDropdownList(): void {
        console.log("TRIGGER");
        this._isDropdownItemsVisible = false;
    }
}
