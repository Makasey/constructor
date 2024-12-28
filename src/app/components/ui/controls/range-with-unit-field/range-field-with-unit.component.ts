import { APDropdownFieldComponent, APFormControl, APNumberFieldComponent, RangeWithUnit, defaultRangeWithUnitValue } from "@components";
import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation, forwardRef, input, output } from "@angular/core";

import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR } from "@angular/forms";
import { StyleUnit } from "@modules/constructor";

@Component({
    selector: "lz-range-with-unit-field",
    imports: [FormsModule, APDropdownFieldComponent, APNumberFieldComponent],
    templateUrl: "./range-field-with-unit.component.html",
    styleUrls: ["./range-field-with-unit.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => RangeFieldWithUnitComponent),
        },
    ],
})
export class RangeFieldWithUnitComponent<T> implements ControlValueAccessor {
    @HostBinding("class.lz-range-with-unit-field")
    public hostClass = true;

    public readonly nativeControl = input<FormControl>();

    public readonly controlModel = input<APFormControl>();

    public readonly label = input<string>();

    public readonly min = input(0);

    public readonly max = input<number>(Number.MAX_SAFE_INTEGER);

    public readonly step = input<1>();

    public readonly items = input<
        {
            label: string;
            value: T;
        }[]
    >([]);

    public readonly selectLabelKey = input("label");

    public readonly selectValueKey = input("value");

    @Input()
    public set value(value: RangeWithUnit | null) {
        this._value = value ?? { ...defaultRangeWithUnitValue };
    }

    public readonly onValueChange = output<RangeWithUnit>();

    public _value: RangeWithUnit;

    public isDisabled = false;

    public onChange: (value: RangeWithUnit) => void;

    public onTouched: () => void;

    public registerOnChange(fn: (value: RangeWithUnit) => void): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    public setDisabledState(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }

    public writeValue(obj: RangeWithUnit | null): void {
        this.value = obj;
    }

    public updateRange(event: number): void {
        this._value = {
            ...this._value,
            value: event,
        };

        this.emitRangeValue();
    }

    public updateUnitValue(event: StyleUnit): void {
        this._value = {
            ...this._value,
            unit: event,
        };

        this.emitRangeValue();
    }

    private emitRangeValue(): void {
        this.onChange(this._value);
        this.onValueChange.emit(this._value);
    }
}
