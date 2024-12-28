import { APDropdownFieldComponent, APFormControl, APNumberFieldComponent, Direction, defaultDirectionValue } from "@components";
import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation, input, output } from "@angular/core";

import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR } from "@angular/forms";
import { Directions, StyleUnit } from "@modules/constructor";

@Component({
    selector: "lz-direction-field",
    imports: [APDropdownFieldComponent, FormsModule, APNumberFieldComponent],
    templateUrl: "./direction-field.component.html",
    styleUrls: ["./direction-field.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: DirectionFieldComponent,
        },
    ],
})
export class DirectionFieldComponent<T> implements ControlValueAccessor {
    @HostBinding("class.direction-field")
    public hostClass = true;

    public readonly nativeControl = input<FormControl>();

    public readonly controlModel = input<APFormControl>();

    public readonly label = input<string>();

    public readonly min = input<number>(Number.MIN_VALUE);

    public readonly max = input<number>(Number.MAX_VALUE);

    public readonly items = input<
        {
            label: string;
            value: T;
        }[]
    >([]);

    public readonly selectLabelKey = input("label");

    public readonly selectValueKey = input("value");

    @Input() public set value(value: Direction | null) {
        this._value = value ?? { ...defaultDirectionValue };
    }

    public readonly onValueChange = output<Direction>();

    public _value: Direction = { ...defaultDirectionValue };

    public isConnected = true;

    public isDisabled = false;

    public Directions = Directions;

    private onChange: (value: Direction) => void;

    private onTouched: () => void;

    public registerOnChange(fn: (value: Direction) => void): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    public setDisabledState(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }

    public writeValue(obj: Direction): void {
        this.value = obj;
    }

    public updateDirectionValue(value: number, type: string): void {
        if (this.isConnected) {
            this.updateConnectedValue(value);
        } else {
            this.updateNoConnectedValue(value, type);
        }

        this.emitControlValue();
    }

    public updateUnitValue(unit: StyleUnit): void {
        this._value = {
            ...this._value,
            unit: unit,
        };

        this.emitControlValue();
    }

    public updateIsConnected(): void {
        this.isConnected = !this.isConnected;
    }

    private updateNoConnectedValue(value: number, type: string): void {
        this._value = {
            ...this._value,
            [type]: value,
        };
    }

    private updateConnectedValue(value: number): void {
        this._value = {
            ...this._value,
            top: value,
            bottom: value,
            left: value,
            right: value,
        };
    }

    private emitControlValue(): void {
        this.onChange(this._value);
        this.onValueChange.emit(this._value);
    }
}
