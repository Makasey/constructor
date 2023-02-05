import { APFormControl } from "../../form";
import { APNumberFieldValueChangeEvent } from "./types";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from "@angular/forms";

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

    @Output()
    public onValueChange: EventEmitter<APNumberFieldValueChangeEvent> = new EventEmitter<APNumberFieldValueChangeEvent>();

    @Output()
    public onBlur: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();

    @Output()
    public onFocus: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();

    public _value: number | string;

    public onChange: (value: number) => void;

    public onTouched: () => void;

    public disabled = false;

    public touched = false;

    public writeValue(value: number): void {
        this._value = value || "";
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
        console.log(input.value);
        const parsedValue = this.getNumbersFromString(input.value);
        this.updateValue(parsedValue, this._value);
        parsedValue ? (input.value = parsedValue) : (input.value = "");
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
        this.writeValue(value!);
        this.onChange(value!);
        this.onValueChange.emit({
            newValue: value!,
            oldValue: +oldValue,
        });

        console.log("VALUE", this._value, newValue, this.nativeControl.errors);
    }

    private getNumbersFromString(value: string): string {
        const regexp = new RegExp("-?[0-9.]*");
        const parsedValue = value.match(regexp)!.join("");
        const lastDotIndex = parsedValue.lastIndexOf(".");
        console.log(parsedValue.slice(0, lastDotIndex));
        return parsedValue.indexOf(".") === lastDotIndex ? parsedValue : parsedValue.slice(0, lastDotIndex);
    }

    public _onPasteValue(event: ClipboardEvent): void {
        //console.log(event);
    }
}
