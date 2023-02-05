import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output, forwardRef } from "@angular/core";
import { Color, basicColors } from "./types";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
    selector: "lz-color-picker",
    templateUrl: "./color-picker.component.html",
    styleUrls: ["./color-picker.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ColorPickerComponent),
            multi: true,
        },
    ],
})
export class ColorPickerComponent implements ControlValueAccessor {
    @Output()
    public onColorChange: EventEmitter<Color> = new EventEmitter<Color>();

    @Input()
    public colors: Color[] = basicColors;

    @Input()
    public width: number = 250;

    @HostBinding("class.color-picker")
    public hostClass = true;

    @HostBinding("style.width.px")
    public get colorPickerWidth(): number {
        return this.width;
    }

    public value: Color;
    private onChange: (value: Color) => void = () => undefined;
    private onTouched: () => unknown = () => ({});

    public registerOnChange(fn: (value: Color) => void): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    public writeValue(value: Color): void {
        this.value = value;
    }

    public checkChanges(index: number, item: Color): string {
        return item.color;
    }

    public pickColor(color: Color): void {
        this.onChange(color);
        this.writeValue(color);
        this.onColorChange.emit(color);
    }
}
