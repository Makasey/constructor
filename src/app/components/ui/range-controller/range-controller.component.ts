import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, forwardRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

import { Range } from "./types";

@Component({
    selector: "lz-range-controller",
    templateUrl: "./range-controller.component.html",
    styleUrls: ["./range-controller.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => RangeControllerComponent),
            multi: true,
        },
    ],
})
export class RangeControllerComponent implements ControlValueAccessor {
    @Input() public set value(value: Range) {
        this.min = value?.min;
        this.max = value?.max;
    }

    @Output() public changeValue: EventEmitter<Range> = new EventEmitter<Range>();
    public min: number = 1500;
    public max: number = 23000;
    public minRangeFrom: number = 500;
    public minRangeTo: number = 22500;
    public maxRangeTo: number = 45500;
    public minRate: number = 500;
    public maxRate: number = 45500;
    private range: Range;

    private onChange: (value: Range) => void = () => undefined;
    private onTouched: () => unknown = () => ({});

    public writeValue(value: Range): void {
        this.range = value;
    }

    public registerOnChange(fn: (value: Range) => void): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    public checkMinRangeValue(): void {
        const value = this.min;

        if (value > this.minRangeTo) {
            this.min = this.minRangeTo;
        }

        if (value < this.minRangeFrom) {
            this.min = this.minRangeFrom;
        }

        this.valuesChange();
    }

    public checkMaxRangeValue(): void {
        const value = this.max;

        if (value > this.maxRangeTo) {
            this.max = this.maxRangeTo;
        }

        if (value < this.minRangeTo) {
            this.max = this.minRangeTo;
        }

        this.valuesChange();
    }

    public valuesChange(): void {
        this.onChange({ min: +this.min, max: +this.max });
        this.changeValue.emit({ min: +this.min, max: +this.max });
    }
}
