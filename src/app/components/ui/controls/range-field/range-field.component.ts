import { APFormControl, defaultRangeStep, defaultRangeValue } from "@components";
import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation, forwardRef, input, output } from "@angular/core";

import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
    selector: "lz-range-field",
    imports: [APDropdownFieldModule, APNumberFieldComponent, FormsModule],
    templateUrl: "./range-field.component.html",
    styleUrls: ["./range-field.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => RangeFieldComponent),
        },
    ]
})
export class RangeFieldComponent implements ControlValueAccessor {
    @HostBinding("class.lz-range-field")
    public hostClass = true;

    public readonly nativeControl = input<FormControl>();

    public readonly controlModel = input<APFormControl>();

    public readonly label = input<string>();

    public readonly step = input(defaultRangeStep);

    public readonly min = input<number>(Number.MIN_VALUE);

    public readonly max = input<number>(Number.MAX_VALUE);

    @Input()
    public set value(value: number) {
        this._value = value ?? defaultRangeValue;
    }

    public readonly onValueChange = output<number>();

    public _value: number;

    public isDisabled = false;

    public onChange: (value: number) => void;

    public onTouched: () => void;

    public registerOnChange(fn: (value: number) => void): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    public setDisabledState(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }

    public writeValue(obj: number): void {
        this.value = obj;
    }

    public updateRange(event: number): void {
        this._value = event;

        this.emitRangeValue();
    }

    private emitRangeValue(): void {
        this.onChange(this._value);
        this.onValueChange.emit(this._value);
    }
}
