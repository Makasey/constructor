import { APDropdownFieldModule, APFormControl, APNumberFieldModule, NumberWithDropdownEvent } from "@components";
import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output, ViewEncapsulation } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
    selector: "lz-number-with-dropdown-field",
    templateUrl: "./number-with-dropdown-field.component.html",
    styleUrls: ["./number-with-dropdown-field.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    imports: [CommonModule, APNumberFieldModule, APDropdownFieldModule, FormsModule],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: NumberWithDropdownFieldComponent,
        },
    ],
})
export class NumberWithDropdownFieldComponent<T> implements ControlValueAccessor {
    @HostBinding("class.lz-number-with-dropdown-field")
    public hostClass = true;

    @Input()
    public nativeControl: FormControl;

    @Input()
    public controlModel: APFormControl;

    @Input()
    public items: { label: string; value: T }[] = [];

    @Input()
    public nativeId = "newID";

    @Input()
    public selectLabelKey = "label";

    @Input()
    public selectValueKey = "value";

    @Input()
    public label = "";

    @Output()
    public readonly onValueChange: EventEmitter<NumberWithDropdownEvent<T>> = new EventEmitter<NumberWithDropdownEvent<T>>();

    public value: NumberWithDropdownEvent<T>;

    public isDisabled = false;

    private onChangeHandler: (value: NumberWithDropdownEvent<T>) => void;

    private onTouchedHandler: () => void;

    public registerOnChange(fn: (value: NumberWithDropdownEvent<T>) => void): void {
        this.onChangeHandler = fn;
    }

    public registerOnTouched(fn: () => void): void {
        this.onTouchedHandler = fn;
    }

    public setDisabledState(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }

    public writeValue(obj: NumberWithDropdownEvent<T> | null): void {
        this.value = obj ? obj : { value: 0, unit: null as T };
    }

    public updateNumberValue(value: number): void {
        this.value = {
            ...this.value,
            value: value,
        };

        this.emitControlValue();
    }

    public onFocus(): void {
        this.onTouchedHandler();
    }

    public onBlur(): void {
        this.onTouchedHandler();
    }

    public updateDropdownValue(value: T): void {
        this.value = {
            ...this.value,
            unit: value,
        };

        this.emitControlValue();
    }

    private emitControlValue(): void {
        this.onChangeHandler(this.value);
        this.onValueChange.emit(this.value);
    }
}
