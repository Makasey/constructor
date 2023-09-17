import { APDropdownFieldModule, APFormControl } from "@components/ui";
import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output, ViewEncapsulation } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR } from "@angular/forms";
import { DEFAULT_DIRECTION_CONTROLLER_VALUE } from "@modules/constructor/components/edit-area/component/section/constants";
import { DirectionController } from "@components/ui/controls/direction-field/types";
import { Directions, StyleUnit } from "@modules/constructor/components/edit-area/enums";

@Component({
    selector: "lz-direction-field",
    standalone: true,
    imports: [CommonModule, APDropdownFieldModule, FormsModule],
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

    @Input()
    public nativeControl: FormControl;

    @Input()
    public controlModel: APFormControl;

    @Input()
    public label: string;

    @Input()
    public items: { label: string; value: T }[] = [];

    @Input()
    public selectLabelKey = "label";

    @Input()
    public selectValueKey = "value";

    @Input() public set value(value: DirectionController | null) {
        this._value = value ?? DEFAULT_DIRECTION_CONTROLLER_VALUE;
    }

    @Output()
    public readonly onValueChange: EventEmitter<DirectionController> = new EventEmitter<DirectionController>();

    public _value: DirectionController = DEFAULT_DIRECTION_CONTROLLER_VALUE;

    public isConnected = true;

    public isDisabled = false;

    public Directions = Directions;

    private onChange: (value: DirectionController) => void;

    private onTouched: () => void;

    public registerOnChange(fn: (value: DirectionController) => void): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    public setDisabledState(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }

    public writeValue(obj: DirectionController): void {
        this.value = obj;
    }

    public updateDirectionValue(value: number, type: string): void {
        this.isConnected ? this.updateConnectedValue(value) : this.updateNoConnectedValue(value, type);

        this.emitControlValue();
    }

    public updateUnitValue(unit: StyleUnit): void {
        this._value = {
            ...this._value,
            unit: unit,
        };

        this.emitControlValue();
    }

    public updateIsConnected(event: boolean): void {
        this.isConnected = event;
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
