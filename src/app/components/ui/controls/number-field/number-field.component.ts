import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output } from "@angular/core";
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from "@angular/forms";

import { APFormControl, APNumberFieldValueChangeEvent } from "@components";
import { calculateFractionNumber, normalizeMaxValue, normalizeMinValue, normalizeNumberValue, roundNumberWithFraction } from "@shared-utils";

@Component({
    selector: "ap-number-field",
    templateUrl: "./number-field.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ["./number-field.component.scss"],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: APNumberFieldComponent,
            multi: true,
        },
    ],
})
export class APNumberFieldComponent implements ControlValueAccessor {
    @Input()
    public nativeControl: FormControl;

    @Input()
    public controlModel: APFormControl;

    @Input()
    public label = "";

    @Input()
    public step = 1;

    @Input()
    public max = Number.MAX_SAFE_INTEGER;

    @Input()
    public min = 0;

    @Output()
    public readonly onValueChange: EventEmitter<APNumberFieldValueChangeEvent> = new EventEmitter<APNumberFieldValueChangeEvent>();

    @Output()
    public readonly onBlur: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();

    @Output()
    public readonly onFocus: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();

    @HostListener("keydown.arrowUp.prevent")
    public onCountIncrease(): void {
        const fractionNumber = calculateFractionNumber(this.step);
        const processedValue = roundNumberWithFraction(Number(this._value) + this.step, fractionNumber);
        const clampedValue = normalizeMaxValue(processedValue, this.max);

        this.updateValue(clampedValue, this._value);
    }

    @HostListener("keydown.arrowDown.prevent")
    public onCountDecrease(): void {
        const fractionNumber = calculateFractionNumber(this.step);
        const processedValue = roundNumberWithFraction(Number(this._value) - this.step, fractionNumber);
        const clampedValue = normalizeMinValue(processedValue, this.min);

        this.updateValue(clampedValue, this._value);
    }

    public _value: number;

    public onChange: (value: number) => void;

    public onTouched: () => void;

    public disabled = false;

    public touched = false;

    public writeValue(value: number): void {
        this._value = this.processBoundariesValue(value);
    }

    public registerOnChange(fn: (value: number) => unknown): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: () => unknown): void {
        this.onTouched = fn;
    }

    public setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    public _onInput(value: string): void {
        const parsedValue = this.getNumbersFromString(value);
        const clampedValue = normalizeNumberValue(+parsedValue, this.min, this.max);
        this.updateValue(clampedValue, this._value);
    }

    public _onFocus(event: Event | FocusEvent): void {
        const changed = !this.touched;
        this.touched = true;
        if (changed) {
            this.onFocus.emit(event as FocusEvent);
        }
    }

    public _onBlur(event: Event | FocusEvent): void {
        const isTouched = this.touched;
        this.touched = false;
        if (isTouched) {
            this.onBlur.emit(event as FocusEvent);
            this.onTouched();
        }
    }

    public updateValue(newValue: number, oldValue: number): void {
        const value = !isNaN(+newValue) ? +newValue : this.min ?? 0;
        this.writeValue(value);
        this.emitEvent(oldValue);
    }

    private getNumbersFromString(value: string): string {
        const regexp = new RegExp("-?[0-9.]*");
        const parsedValue = value.match(regexp)!.join("");
        const lastDotIndex = parsedValue.lastIndexOf(".");
        return parsedValue.indexOf(".") === lastDotIndex ? parsedValue : parsedValue.slice(0, lastDotIndex);
    }

    public processBoundariesValue(value: number): number {
        return normalizeNumberValue(value, this.min, this.max);
    }

    private emitEvent(oldValue: number): void {
        this.onChange(this._value);
        this.onValueChange.emit({
            newValue: this._value,
            oldValue: oldValue,
        });
    }
}
