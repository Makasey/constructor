import { APFormControl, NumberWithDropdownEvent } from "@components";
import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation, input, output } from "@angular/core";

import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR } from "@angular/forms";
import { SelectItem } from "@shared-types";

@Component({
    selector: "lz-number-with-dropdown-field",
    templateUrl: "./number-with-dropdown-field.component.html",
    styleUrls: ["./number-with-dropdown-field.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [APNumberFieldComponent, APDropdownFieldComponent, FormsModule],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: NumberWithDropdownFieldComponent,
        },
    ]
})
export class NumberWithDropdownFieldComponent<T> implements ControlValueAccessor {
    @HostBinding("class.lz-number-with-dropdown-field")
    public hostClass = true;

    public readonly nativeControl = input<FormControl>();

    public readonly controlModel = input<APFormControl>();

    public readonly items = input<SelectItem<T>[]>([]);

    public readonly nativeId = input("newID");

    public readonly selectLabelKey = input("label");

    public readonly selectValueKey = input("value");

    public readonly label = input("");

    public readonly max = input<number>();

    public readonly min = input<number>();

    public readonly onValueChange = output<NumberWithDropdownEvent<T>>();

    public value: NumberWithDropdownEvent<T>;

    public isDisabled = false;

    private onChangeHandler: (value: NumberWithDropdownEvent<T>) => void;

    private onTouchedHandler: () => void;

    public registerOnChange(fn: (value: NumberWithDropdownEvent<T>) => void): void {
        this.onChangeHandler = fn;
    }

    public registerOnTouched(fn: () => void): void {
        this.onTouchedHandler = fn;
    }

    public setDisabledState(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }

    public writeValue(obj: NumberWithDropdownEvent<T> | null): void {
        this.value = obj ? obj : { value: 0, unit: null as T };
    }

    public updateNumberValue(value: number): void {
        this.value = {
            ...this.value,
            value: value,
        };

        this.emitControlValue();
    }

    public onFocus(): void {
        this.onTouchedHandler();
    }

    public onBlur(): void {
        this.onTouchedHandler();
    }

    public updateDropdownValue(value: T): void {
        this.value = {
            ...this.value,
            unit: value,
        };

        this.emitControlValue();
    }

    private emitControlValue(): void {
        this.onChangeHandler(this.value);
        this.onValueChange.emit(this.value);
    }
}
