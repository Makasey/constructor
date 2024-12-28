import { APFormControl, APTextFieldValueChangeEvent, ApTextFormControlOptions, defaultAPTextFieldOptions } from "@components";
import { ChangeDetectionStrategy, Component, OnChanges, SimpleChanges, ViewEncapsulation, forwardRef, input, output } from "@angular/core";
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from "@angular/forms";
import { KeyValuePipe } from "@angular/common";

@Component({
    selector: "lz-textarea",
    templateUrl: "./textarea.component.html",
    styleUrls: ["./textarea.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TextareaComponent),
            multi: true,
        },
    ],
    imports: [KeyValuePipe],
})
export class TextareaComponent implements ControlValueAccessor, OnChanges {
    public readonly nativeControl = input.required<FormControl>();

    public readonly controlModel = input.required<APFormControl>();

    public readonly onValueChange = output<APTextFieldValueChangeEvent>();

    public readonly onBlur = output<FocusEvent>();

    public readonly onFocus = output<FocusEvent>();

    public _value: string;

    public touched = false;

    public disabled = false;

    public _options: ApTextFormControlOptions;

    public onChange: (value: string) => void;

    public onTouched: () => void;

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.controlModel) {
            this._options = {
                ...defaultAPTextFieldOptions,
                ...this.controlModel().options,
            };
        }
    }

    public writeValue(newValue: string): void {
        this._value = newValue;
    }

    public registerOnChange(onChange: (value: string) => unknown): void {
        this.onChange = onChange;
    }

    public registerOnTouched(onTouched: () => unknown): void {
        this.onTouched = onTouched;
    }

    public setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    public _onValueChange(value: APTextFieldValueChangeEvent): void {
        this.onValueChange.emit(value);
    }

    public _onInput(event: Event): void {
        const oldValue = this._value;
        const newValue = (event.target as HTMLInputElement).value.trim();
        this.writeValue(newValue);
        this.onChange(newValue);
        this._onValueChange({ newValue: newValue, oldValue: oldValue });
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
}
