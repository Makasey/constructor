import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Optional, Output, Self } from "@angular/core";
import { ControlValueAccessor, NgControl } from "@angular/forms";
import { LZDay, LZMonth } from "./classes";

@Component({
    selector: "lz-calendar",
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: "./calendar.component.html",
})
export class LZCalendarComponent implements ControlValueAccessor {
    @Input()
    public set value(value: LZDay | Date | string) {
        const convertedValue = this.convertValueToCorrectDate(value);

        this.writeValue(convertedValue);
        this.month = new LZMonth(convertedValue.year, convertedValue.month);
    }

    @Input()
    public set month(value: LZMonth) {
        this._month = value ?? LZMonth.currentLocal();
    }

    @Output()
    public valueChange: EventEmitter<LZDay> = new EventEmitter<LZDay>();

    @HostBinding("class.lz-calendar")
    public hostClass = true;

    public _value: LZDay = LZDay.currentLocal();

    public _month: LZMonth = LZMonth.currentLocal();

    public disabled = false;

    public weekdays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

    private onChange: (value: LZDay | Date | string) => void = (value: LZDay | Date | string) => undefined;

    private onTouched: () => void = () => undefined;

    constructor(@Self() @Optional() private control: NgControl) {
        if (control) {
            this.control.valueAccessor = this;
        }
    }

    public setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    public registerOnChange(fn: (value: LZDay | Date | string) => void): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    public writeValue(value: LZDay | Date | string): void {
        this._value = this.convertValueToCorrectDate(value);
    }

    public pickDate(day: LZDay): void {
        this.writeValue(day);
        if (!day.monthSame(this._month)) {
            this._month = new LZMonth(day.year, day.month);
        }

        this.onChange(day);
        this.onTouched();
        this.valueChange.emit(day);
    }

    public _trackByDay(index: number, day: LZDay): string {
        return day.toString();
    }

    public onNextMonthClick(): void {
        this.month = this._month.append({ month: 1 });
    }

    public onPreviousMonthClick(): void {
        this.month = this._month.append({ month: -1 });
    }

    private convertValueToCorrectDate(value: LZDay | Date | string): LZDay {
        let convertedValue: LZDay;

        if (value instanceof Date) {
            convertedValue = LZDay.fromLocalNativeDate(value);
        } else if (typeof value === "string") {
            convertedValue = LZDay.fromUTCNativeDate(new Date(value));
        } else {
            convertedValue = value;
        }

        return convertedValue;
    }
}
