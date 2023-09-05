import { APFormControl, ApTextFormControlOptions } from "@components/ui";
import { AsyncPipe, NgIf } from "@angular/common";
import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewEncapsulation,
    forwardRef,
} from "@angular/core";

import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from "@angular/forms";
import { Observable, debounceTime, distinctUntilChanged, tap } from "rxjs";
import { filterNilValue } from "@datorama/akita";

import { defaultColorPikerOptions } from "@components/ui/controls/text-field/types";

@Component({
    selector: "lz-color-picker",
    templateUrl: "./color-picker.component.html",
    styleUrls: ["./color-picker.component.scss"],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [ReactiveFormsModule, NgIf, AsyncPipe],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => LZColorPickerComponent),
            multi: true,
        },
    ],
})
export class LZColorPickerComponent implements ControlValueAccessor, OnInit, OnChanges {
    @Input({ required: true })
    public nativeControl: FormControl;

    @Input({ required: true })
    public controlModel: APFormControl;

    @Output()
    public readonly onValueChange: EventEmitter<string> = new EventEmitter<string>();

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
            debounceTime(500),
            tap(value => {
                this.onValueChange.emit(value);
                this.onChange(value);
            }),
        );
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.controlModel) {
            this._options = {
                ...defaultColorPikerOptions,
                ...this.controlModel.options,
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
