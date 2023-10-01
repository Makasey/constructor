import { APDropdownFieldModule, APFormControl, APNumberFieldModule, defaultRangeStep, defaultRangeValue } from "@components";
import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output, ViewEncapsulation, forwardRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
    selector: "lz-range-field",
    standalone: true,
    imports: [CommonModule, APDropdownFieldModule, APNumberFieldModule, FormsModule],
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
    ],
})
export class RangeFieldComponent implements ControlValueAccessor {
    @HostBinding("class.lz-range-field")
    public hostClass = true;

    @Input()
    public nativeControl: FormControl;

    @Input()
    public controlModel: APFormControl;

    @Input()
    public label: string;

    @Input()
    public step = defaultRangeStep;

    @Input()
    public min: number = Number.MIN_VALUE;

    @Input()
    public max: number = Number.MAX_VALUE;

    @Input()
    public set value(value: number) {
        this._value = value ?? defaultRangeValue;
    }

    @Output()
    public readonly onValueChange: EventEmitter<number> = new EventEmitter<number>();

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
