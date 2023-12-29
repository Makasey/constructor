import {
    APDropdownFieldModule,
    APFormControl,
    BorderFieldModel,
    Direction,
    DirectionFieldComponent,
    LZColorPickerComponent,
    LZFileUploadComponent,
    LZImageFieldComponent,
    LzTabsComponent,
    RadioGroupComponent,
    TabsItemComponent,
    defaultDirectionValue,
} from "@components";
import { BorderType, ElementSettingsComponent, defaultBorderTypeControls, defaultSizeControlUnit } from "@modules/constructor";
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from "@angular/core";
import { FormControl, FormsModule, NG_VALUE_ACCESSOR } from "@angular/forms";
import { NgIf } from "@angular/common";

@Component({
    selector: "lz-border-field",
    standalone: true,
    templateUrl: "./border-field.component.html",
    styleUrl: "./border-field.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [
        LZColorPickerComponent,
        FormsModule,
        LzTabsComponent,
        ElementSettingsComponent,
        TabsItemComponent,
        RadioGroupComponent,
        NgIf,
        LZImageFieldComponent,
        LZFileUploadComponent,
        APDropdownFieldModule,
        DirectionFieldComponent,
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: BorderFieldComponent,
        },
    ],
})
export class BorderFieldComponent {
    @Input()
    public nativeControl: FormControl;

    @Input()
    public controlModel: APFormControl;

    public _value: BorderFieldModel = {
        borderWidth: {
            ...defaultDirectionValue,
        },
        borderRadius: {
            ...defaultDirectionValue,
        },
        borderColor: "#000000",
        borderType: BorderType.NONE,
    };

    public onChange: (value: BorderFieldModel) => void;

    public onTouched: () => void;

    public readonly defaultBorderTypeControls = defaultBorderTypeControls;

    public readonly defaultSizeControlUnit = defaultSizeControlUnit;

    public readonly BorderType = BorderType;

    public registerOnChange(onChange: (value: BorderFieldModel) => void): void {
        this.onChange = onChange;
    }

    public registerOnTouched(onTouched: () => void): void {
        this.onTouched = onTouched;
    }

    public writeValue(newValue: BorderFieldModel): void {
        this._value = newValue;
    }

    public handleBorderType(borderType: BorderType): void {
        this._value = {
            ...this._value,
            borderType: borderType,
        };

        this.emitEvent();
    }

    public handleBorderWidth(borderWidth: Direction): void {
        this._value = {
            ...this._value,
            borderWidth: {
                ...borderWidth,
            },
        };

        this.emitEvent();
    }

    public handleBorderRadius(borderRadius: Direction): void {
        this._value = {
            ...this._value,
            borderRadius: {
                ...borderRadius,
            },
        };

        this.emitEvent();
    }

    public handleBorderColor(borderColor: string): void {
        this._value = {
            ...this._value,
            borderColor: borderColor,
        };

        this.emitEvent();
    }

    private emitEvent(): void {
        this.onChange(this._value);
    }
}
