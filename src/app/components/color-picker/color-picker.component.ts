import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { Color } from "./interfaces";
import { basicColors } from "./initial";

@Component({
  selector: 'lz-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
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

  public value: Color;
  private onChange: (value: Color) => void = (value: Color) => undefined;
  private onTouched: () => unknown = () => ({});

  public registerOnChange(fn: (value: Color) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public writeValue(value: Color): void {
    this.value = value;
    this.onColorChange.emit(value);
  }

  public checkChanges(index: number, item: Color): string {
    return item.color;
  }

  public pickColor(color: Color) {
    this.onChange(color);
    this.writeValue(color)
  }
}
