import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output, ViewChild } from "@angular/core";
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from "@angular/forms";

import { APFormControl, APNumberFieldValueChangeEvent } from "@components";
import { calculateFractionNumber, normalizeNumberValue, roundNumberWithFraction } from "@shared-utils";

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

    @HostListener("keydown.arrowUp")
    public onCountIncrease(): void {
        const fractionNumber = calculateFractionNumber(this.step);

        const processedValue = roundNumberWithFraction(Number(this._value) + this.step, fractionNumber);
        const clampedValue = Math.min(this.max, processedValue);

        this.updateValue(`${clampedValue}`, this._value);
    }

    @HostListener("keydown.arrowDown")
    public onCountDecrease(): void {
        const fractionNumber = calculateFractionNumber(this.step);
        const processedValue = roundNumberWithFraction(Number(this._value) - this.step, fractionNumber);
        const clampedValue = Math.max(this.min, processedValue);

        this.updateValue(`${clampedValue}`, this._value);
    }

    @ViewChild("numberField", { static: true })
    public numberField: HTMLInputElement;

    public _value: number | string;

    public onChange: (value: number) => void;

    public onTouched: () => void;

    public disabled = false;

    public touched = false;

    public writeValue(value: number): void {
        const processedValue = this.getNumbersFromString(`${value}`);
        const clampedValue = this.processBoundariesValue(+processedValue);

        this.updateInputValue(`${clampedValue}`);
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

    public _onInput(event: Event): void {
        const input = event && (event.target as HTMLInputElement);

        if (this._value === input.value) {
            return;
        }

        const parsedValue = this.getNumbersFromString(input.value);
        this.updateValue(parsedValue, this._value);

        this._value = +parsedValue;

        input.value = parsedValue;
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

    public updateValue(newValue: string, oldValue: number | string): void {
        const value = newValue && !isNaN(+newValue) ? +newValue : null;
        this.onChange(value!);
        this.updateInputValue(`${value!}`);
        this.onValueChange.emit({
            newValue: value!,
            oldValue: +oldValue,
        });
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

    private updateInputValue(value: string): void {
        this._value = value;

        this.updateInputNodeValue();
    }

    private updateInputNodeValue(): void {
        this.numberField.value = this._value as string;
    }
}
