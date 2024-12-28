import { APFormControl, RadioGroupItem } from "@components";
import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation, forwardRef, input, output } from "@angular/core";

import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR } from "@angular/forms";
import { NgClass } from "@angular/common";

@Component({
    selector: "lz-radio-group",
    imports: [FormsModule, NgClass],
    templateUrl: "./radio-group.component.html",
    styleUrls: ["./radio-group.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => RadioGroupComponent),
        },
    ],
})
export class RadioGroupComponent implements ControlValueAccessor {
    @HostBinding("class.radio-group")
    public hostClass = true;

    public readonly nativeControl = input<FormControl>();

    public readonly controlModel = input<APFormControl>();

    public readonly items = input.required<RadioGroupItem[]>();

    public readonly label = input<string>();

    public readonly onValueChange = output<unknown>();

    public _value: string;

    public onChange: (value: string) => void;

    public onTouched: () => void;
    public registerOnChange(fn: (value: string) => void): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    public writeValue(value: string): void {
        this._value = value;
    }

    public updateRadioGroup(event: string): void {
        this._value = event;
        this.onChange(this._value);
        this.onValueChange.emit(this._value);
    }
}
