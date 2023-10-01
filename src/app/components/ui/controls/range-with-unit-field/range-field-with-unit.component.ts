import { APDropdownFieldModule, APFormControl, APNumberFieldModule, RangeWithUnit, defaultRangeWithUnitValue } from "@components";
import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output, ViewEncapsulation, forwardRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR } from "@angular/forms";
import { StyleUnit } from "@modules/constructor";

@Component({
    selector: "lz-range-with-unit-field",
    standalone: true,
    imports: [CommonModule, FormsModule, APDropdownFieldModule, APNumberFieldModule],
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

    @Input()
    public nativeControl: FormControl;

    @Input()
    public controlModel: APFormControl;

    @Input()
    public label: string;

    @Input()
    public min = 0;

    @Input()
    public max: number = Number.MAX_SAFE_INTEGER;

    @Input()
    public step: 1;

    @Input()
    public items: { label: string; value: T }[] = [];

    @Input()
    public selectLabelKey = "label";

    @Input()
    public selectValueKey = "value";

    @Input()
    public set value(value: RangeWithUnit | null) {
        this._value = value ?? { ...defaultRangeWithUnitValue };
    }

    @Output()
    public readonly onValueChange: EventEmitter<RangeWithUnit> = new EventEmitter<RangeWithUnit>();

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
