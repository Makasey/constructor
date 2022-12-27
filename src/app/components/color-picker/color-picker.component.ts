import { ChangeDetectionStrategy, Component, forwardRef, Input } from '@angular/core';
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

  @Input()
  public colors: Color[] = basicColors;

  @Input()
  public width: number = 250;
  private value: string = '';
  private onChange: (value: string) => void = (value: string) => undefined;
  private onTouched: () => unknown = () => ({});

  public registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public writeValue(value: string): void {
    this.value = value;
  }

  public checkChanges(index: number, item: Color): string {
    return item.color;
  }

  colorPick(color: string) {
    this.onChange(color)
  }
}
