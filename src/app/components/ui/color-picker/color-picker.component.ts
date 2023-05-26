import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output, forwardRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

import { Color, basicColors } from "./types";

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
    @Input()
    public colors: Color[] = basicColors;

    @Input()
    public width = 250;

    @Input()
    public set value(value: Color[] | number[]) {
        this.writeValue(value ?? []);
    }

    @Output()
    public readonly onColorChange: EventEmitter<Color[]> = new EventEmitter<Color[]>();

    @HostBinding("class.color-picker")
    public hostClass = true;

    @HostBinding("style.width.px")
    public get colorPickerWidth(): number {
        return this.width;
    }

    public _value: Color[];
    private onChange: (value: Color[]) => void = () => undefined;
    private onTouched: () => unknown = () => ({});

    public registerOnChange(fn: (value: Color[]) => void): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    public writeValue(value: Color[] | number[]): void {
        const normalizedValue = value ?? [];
        const currentValue: Color[] =
            typeof normalizedValue[0] === "number"
                ? this.colors.filter(color => (normalizedValue as number[]).includes(color.id)).filter(Boolean)
                : (normalizedValue as Color[]);

        this._value = [...currentValue];
    }

    public checkChanges(index: number, item: Color): string {
        return item.color;
    }

    public pickColor(color: Color): void {
        const colors = this.getNewColors(color);

        this.onChange(colors);
        this.writeValue(colors);
        this.onColorChange.emit(colors);
    }

    private getNewColors(value: Color): Color[] {
        let result = this._value;

        result = result.find(color => value.id === color.id) ? result.filter(element => element.id !== value.id) : [...result, value];

        return result;
    }
}
