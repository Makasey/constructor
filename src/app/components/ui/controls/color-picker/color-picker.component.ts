import { APFormControl, ApTextFormControlOptions } from "@components";
import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnChanges, OnInit, SimpleChanges, ViewEncapsulation, forwardRef, input, output } from "@angular/core";

import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from "@angular/forms";
import { Observable, distinctUntilChanged, tap } from "rxjs";
import { filterNilValue } from "@datorama/akita";

import { defaultColorPickerOptions } from "@components";

@Component({
    selector: "lz-color-picker",
    templateUrl: "./color-picker.component.html",
    styleUrls: ["./color-picker.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [ReactiveFormsModule, AsyncPipe],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => LZColorPickerComponent),
            multi: true,
        },
    ],
})
export class LZColorPickerComponent implements ControlValueAccessor, OnInit, OnChanges {
    public readonly nativeControl = input<FormControl>();

    public readonly controlModel = input<APFormControl>();

    public readonly onValueChange = output<string>();

    public readonly colorControl = new FormControl("");

    public _value: string;

    public _options: ApTextFormControlOptions;

    public colorControlValueChange$: Observable<string>;

    public disabled = false;

    public onChange: (value: string) => void;

    public onTouched: () => void;

    public ngOnInit(): void {
        this.colorControlValueChange$ = this.colorControl.valueChanges.pipe(
            filterNilValue(),
            distinctUntilChanged(),
            tap(value => {
                this.onValueChange.emit(value);
                this.onChange(value);
            }),
        );
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.controlModel) {
            this._options = {
                ...defaultColorPickerOptions,
                ...((this.controlModel() ?? {}).options ?? {}),
            };
        }
    }

    public registerOnChange(onChange: (value: string) => unknown): void {
        this.onChange = onChange;
    }

    public registerOnTouched(onTouched: () => unknown): void {
        this.onTouched = onTouched;
    }

    public writeValue(newValue: string): void {
        this.colorControl.setValue(newValue);
    }

    public setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }
}
