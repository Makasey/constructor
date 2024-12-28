import { APFormControl, LZColorPickerComponent, LZFileUploadComponent, LZImageFieldComponent, RadioGroupComponent } from "@components/ui";
import { BackgroundFieldModel, APDropdownFieldComponent } from "@components";
import {
    BackgroundType,
    ObjectFitPosition,
    defaultBackgroundColorItems,
    defaultBackgroundRepeatItems,
    defaultBackgroundSizeItems,
    defaultObjectFitPositionItems,
} from "@modules/constructor";
import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from "@angular/core";
import { File } from "@shared-types";
import { FormControl, FormsModule, NG_VALUE_ACCESSOR } from "@angular/forms";


@Component({
    selector: "lz-background-field",
    templateUrl: "./background-field.component.html",
    styleUrls: ["./background-field.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [LZColorPickerComponent, FormsModule, RadioGroupComponent, LZImageFieldComponent, LZFileUploadComponent, APDropdownFieldComponent],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: BackgroundFieldComponent,
        },
    ]
})
export class BackgroundFieldComponent {
    public readonly nativeControl = input<FormControl>();

    public readonly controlModel = input<APFormControl>();

    public _value: BackgroundFieldModel = { backgroundType: BackgroundType.CLASSIC };

    public onChange: (value: BackgroundFieldModel) => void;

    public onTouched: () => void;

    public readonly BackgroundType = BackgroundType;

    public readonly defaultBackgroundTypes = defaultBackgroundColorItems;

    public readonly defaultBackgroundRepeatItems = defaultBackgroundRepeatItems;

    public readonly defaultBackgroundSizeItems = defaultBackgroundSizeItems;

    public readonly defaultObjectFitPositionItems = defaultObjectFitPositionItems;

    public registerOnChange(onChange: (value: BackgroundFieldModel) => void): void {
        this.onChange = onChange;
    }

    public registerOnTouched(onTouched: () => void): void {
        this.onTouched = onTouched;
    }

    public writeValue(newValue: BackgroundFieldModel): void {
        this._value = newValue;
    }

    public handleBackgroundType(event: BackgroundType): void {
        this._value = {
            ...this._value,
            backgroundType: event,
        };
    }

    public handleColor(event: string): void {
        this._value = {
            ...this._value,
            color: event,
        };

        this.emitEvent();
    }

    public handleRepeat(event: string): void {
        this._value = {
            ...this._value,
            image: {
                ...this._value.image,
                repeat: event,
            },
        };

        this.emitEvent();
    }

    public handleSize(event: string): void {
        this._value = {
            ...this._value,
            image: {
                ...this._value.image,
                size: event,
            },
        };

        this.emitEvent();
    }

    public handlePosition(event: ObjectFitPosition): void {
        this._value = {
            ...this._value,
            image: {
                ...this._value.image,
                position: event,
            },
        };

        this.emitEvent();
    }

    public updateImageValue(value: File): void {
        this._value = {
            ...this._value,
            backgroundType: BackgroundType.IMAGE,
            image: {
                src: value.src,
                fileId: value.id,
                repeat: this._value.image?.repeat || this.defaultBackgroundRepeatItems[0].value,
                size: this._value.image?.size || this.defaultBackgroundSizeItems[0].value,
                position: this.defaultObjectFitPositionItems[0].value,
            },
        };

        this.emitEvent();
    }

    private emitEvent(): void {
        this.onChange(this._value);
    }
}
