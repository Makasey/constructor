import { APFormControl, LZFileUploadComponent } from "@components";
import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation, input } from "@angular/core";

import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR } from "@angular/forms";
import { File } from "@shared-types";
import { APTextFieldComponent } from "../text-field/text-field.component";

@Component({
    selector: "lz-image-field",
    imports: [LZFileUploadComponent, FormsModule, APTextFieldComponent],
    templateUrl: "./image-field.component.html",
    styleUrls: ["./image-field.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: LZImageFieldComponent,
        },
    ]
})
export class LZImageFieldComponent implements ControlValueAccessor {
    @HostBinding("class.lz-image-field")
    public hostClass = true;

    public readonly nativeControl = input<FormControl>();

    public readonly controlModel = input<APFormControl>();

    public readonly label = input<string>();

    public readonly maxLength = input<number>();

    public readonly minLength = input<number>();

    public disabled = false;

    public value: File;

    public onTouchHandler: () => void = () => undefined;

    public onChangeHandler: (value: File) => void = () => undefined;

    public registerOnChange(fn: (value: File) => void): void {
        this.onChangeHandler = fn;
    }

    public registerOnTouched(fn: () => void): void {
        this.onTouchHandler = fn;
    }

    public writeValue(file: File): void {
        this.value = { ...(file ?? {}) };
    }

    public setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    public updateValue(value: File): void {
        this.writeValue(this.processImageValue(value));

        this.updateControlValue();
    }

    public updateAltValue(alt: string): void {
        this.updateValue({
            ...this.value,
            alt: alt,
        });
    }

    public updateTitleValue(title: string): void {
        this.updateValue({
            ...this.value,
            title: title,
        });
    }

    public updateControlValue(): void {
        this.onChangeHandler(this.value);
    }

    private processImageValue(file: File): File {
        const { alt, title } = this.value;

        if (!alt) {
            return {
                ...file,
                alt: file.alt,
            };
        }

        if (!title) {
            return {
                ...file,
                title: file.title,
            };
        }

        return {
            ...file,
        };
    }
}
