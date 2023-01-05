import {ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input} from '@angular/core';
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

  constructor(private cdr: ChangeDetectorRef) {}
  public value: string | number = 0;
  private onChange: (value: string | number) => void = (value: string | number) => undefined;
  private onTouched: () => unknown = () => ({});

  public registerOnChange(fn: (value: string | number) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public writeValue(value: string | number): void {
    this.value = value;
    this.cdr.detectChanges();
  }

  public checkChanges(index: number, item: Color): string {
    return item.color;
  }

  colorPick(color: Color) {
    this.writeValue(color.id);
    this.cdr.detectChanges();
  }
}
