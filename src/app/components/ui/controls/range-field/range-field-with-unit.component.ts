import { APDropdownFieldModule, APFormControl, APNumberFieldModule } from "@components/ui";
import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output, ViewEncapsulation, forwardRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR } from "@angular/forms";
import { Directions, StyleUnit } from "@modules/constructor/components/edit-area/enums";
import { Range, defaultRangeValue } from "@components/ui/controls/range-field/types";

@Component({
    selector: "lz-range-field-with-unit",
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
    @HostBinding("class.lz-range-field")
    public hostClass = true;

    @Input()
    public nativeControl: FormControl;

    @Input()
    public controlModel: APFormControl;

    @Input()
    public label: string;

    @Input()
    public min: number = Number.MIN_VALUE;

    @Input()
    public max: number = Number.MAX_VALUE;

    @Input()
    public items: { label: string; value: T }[] = [];

    @Input()
    public selectLabelKey = "label";

    @Input()
    public selectValueKey = "value";

    @Input()
    public set value(value: Range | null) {
        this._value = value ?? { ...defaultRangeValue };
    }

    @Output()
    public readonly onValueChange: EventEmitter<Range> = new EventEmitter<Range>();

    public _value: Range;

    public isDisabled = false;

    public onChange: (value: Range) => void;

    public onTouched: () => void;

    public registerOnChange(fn: (value: Range) => void): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    public setDisabledState(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }

    public writeValue(obj: Range | null): void {
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

    protected readonly Directions = Directions;
}
