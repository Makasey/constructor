import { APFormControl } from "@components/ui";
import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output, ViewEncapsulation, forwardRef } from "@angular/core";
import { CommonModule, NgForOf } from "@angular/common";
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR } from "@angular/forms";

import { RadioGroupItem } from "@components/ui/controls/radio-group/types";

@Component({
    selector: "lz-radio-group",
    standalone: true,
    imports: [CommonModule, FormsModule, NgForOf],
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

    @Input()
    public nativeControl: FormControl;

    @Input()
    public controlModel: APFormControl;

    @Input({ required: true })
    public items: RadioGroupItem[];

    @Input({ required: true })
    public label: string;

    @Output()
    public readonly onValueChange: EventEmitter<unknown> = new EventEmitter<unknown>();

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
