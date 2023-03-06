import { LZMonth, LZMonthLike } from "./month";
import { isNumberInRange, normalizeToIntNumber } from "../../../utils";
import { LZYear } from "./year";
import { LZDateMode } from "../types";
import { DayOfWeek, MonthNumber } from "../enum";

export class LZDay extends LZMonth implements LZDayLike {
    constructor(readonly year: number, readonly month: number, readonly day: number) {
        super(year, month);
    }

    public static fromLocalNativeDate(date: Date): LZDay {
        return new LZDay(date.getFullYear(), date.getMonth(), date.getDate());
    }

    public static fromUTCNativeDate(date: Date): LZDay {
        return new LZDay(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
    }

    public static isValidDay(year: number, month: number, day: number): boolean {
        return (
            LZMonth.isValidMonth(year, month) &&
            Number.isInteger(day) &&
            isNumberInRange(day, 1, LZMonth.getMonthDaysCount(month, LZMonth.isLeapYear(year)))
        );
    }

    public static override currentLocal(): LZDay {
        const nativeDate = new Date();
        const year = nativeDate.getFullYear();
        const month = nativeDate.getMonth();
        const day = nativeDate.getDate();

        return new LZDay(year, month, day);
    }

    public static override currentUtc(): LZDay {
        const nativeDate = new Date();
        const year = nativeDate.getUTCFullYear();
        const month = nativeDate.getUTCMonth();
        const day = nativeDate.getUTCDate();

        return new LZDay(year, month, day);
    }

    public static normalizeOf(year: number, month: number, day: number): LZDay {
        const normalizedYear = LZYear.normalizeYearPart(year);
        const normalizedMonth = LZMonth.normalizeMonthPart(month);
        const normalizedDay = LZDay.normalizeDayPart(day, month, year);

        return new LZDay(normalizedYear, normalizedMonth, normalizedDay);
    }

    public static override lengthBetween(from: LZDay, to: LZDay): number {
        return Math.round((to.toLocalNativeDate().getTime() - from.toLocalNativeDate().getTime()) / (1000 * 60 * 60 * 24));
    }

    public static parseRawDateString(date: string, dateMode: LZDateMode = "DMY"): { day: number; month: number; year: number } {
        switch (dateMode) {
            case "MDY": {
                return {
                    day: parseInt(date.slice(3, 5), 10),
                    month: parseInt(date.slice(0, 2), 10) - 1,
                    year: parseInt(date.slice(6, 10), 10),
                };
            }

            case "YMD": {
                return {
                    day: parseInt(date.slice(8, 10), 10),
                    month: parseInt(date.slice(5, 7), 10) - 1,
                    year: parseInt(date.slice(0, 4), 10),
                };
            }

            case "DMY":
            default: {
                return {
                    day: parseInt(date.slice(0, 2), 10),
                    month: parseInt(date.slice(3, 5), 10) - 1,
                    year: parseInt(date.slice(6, 10), 10),
                };
            }
        }
    }

    public static normalizeParse(rawDate: string, dateMode: LZDateMode = "DMY"): LZDay {
        const { day, month, year } = this.parseRawDateString(rawDate, dateMode);

        return LZDay.normalizeOf(year, month, day);
    }

    /**
     * Parsing a date stringified in a toJSON format
     * @param yearMonthDayString date string in format of YYYY-MM-DD
     * @return date
     * @throws exceptions if any part of the date is invalid
     */
    public static jsonParse(yearMonthDayString: string): LZDay {
        const { year, month, day } = LZDay.parseRawDateString(yearMonthDayString, "YMD");

        if (!LZYear.isValidYear(year)) {
            throw new Error(`Invalid year ${year}`);
        }

        if (!LZMonth.isValidMonth(year, month)) {
            throw new Error(`Invalid month ${year}`);
        }

        if (!Number.isInteger(day) || !isNumberInRange(day, 1, LZMonth.getMonthDaysCount(month, LZYear.isLeapYear(year)))) {
            throw new Error(`Invalid day ${day}`);
        }

        return new LZDay(year, month, day);
    }

    protected static normalizeDayPart(day: number, month: number, year: number): number {
        const monthDaysCount = LZMonth.getMonthDaysCount(month, LZYear.isLeapYear(year));

        return normalizeToIntNumber(day, 1, monthDaysCount);
    }

    public get formattedDayPart(): string {
        return String(this.day).padStart(2, "0");
    }

    public get isWeekend(): boolean {
        const dayOfWeek = this.dayOfWeek(false);

        return dayOfWeek === DayOfWeek.SUNDAY || dayOfWeek === DayOfWeek.SATURDAY;
    }

    public dayOfWeek(startFromMonday: boolean = true): number {
        const dayOfWeek = startFromMonday ? this.toLocalNativeDate().getDay() - 1 : this.toLocalNativeDate().getDay();

        return dayOfWeek < 0 ? 6 : dayOfWeek;
    }

    public dayBefore(anotherDay: LZDay): boolean {
        return this.monthBefore(anotherDay) || (this.monthSame(anotherDay) && this.day < anotherDay.day);
    }

    public dayBeforeOrSame(anotherDay: LZDay): boolean {
        return this.monthBefore(anotherDay) || (this.monthSame(anotherDay) && this.day <= anotherDay.day);
    }

    public daySame(anotherDay: LZDay): boolean {
        return this.monthSame(anotherDay) && this.day === anotherDay.day;
    }

    public dayAfterOrSame(anotherDay: LZDay): boolean {
        return this.monthAfter(anotherDay) || (this.monthSame(anotherDay) && this.day >= anotherDay.day);
    }

    public dayAfter(anotherDay: LZDay): boolean {
        return this.monthAfter(anotherDay) || (this.monthSame(anotherDay) && this.day > anotherDay.day);
    }

    public dayLimit(min: LZDay | null, max: LZDay | null): LZDay {
        if (min !== null && this.dayBefore(min)) {
            return min;
        }

        if (max !== null && this.dayAfter(max)) {
            return max;
        }

        return this;
    }

    public override append({ year = 0, month = 0, day = 0 }: LZDayLike): LZDay {
        const totalMonths = (this.year + year) * 12 + this.month + month;
        let years = Math.floor(totalMonths / 12);
        let months = totalMonths % 12;
        let days = Math.min(this.day, LZMonth.getMonthDaysCount(months, LZYear.isLeapYear(years))) + day;

        while (days > LZMonth.getMonthDaysCount(months, LZYear.isLeapYear(years))) {
            days -= LZMonth.getMonthDaysCount(months, LZYear.isLeapYear(years));

            if (months === MonthNumber.DECEMBER) {
                years++;
                months = MonthNumber.JANUARY;
            } else {
                months++;
            }
        }

        while (days < 1) {
            if (months === MonthNumber.JANUARY) {
                years--;
                months = MonthNumber.DECEMBER;
            } else {
                months--;
            }

            days += LZMonth.getMonthDaysCount(months, LZYear.isLeapYear(years));
        }

        return new LZDay(years, months, days);
    }

    public getFormattedDay(dateFormat: LZDateMode, separator: string): string {
        const dd = this.formattedDayPart;
        const mm = this.formattedMonthPart;
        const yyyy = this.formattedYear;

        switch (dateFormat) {
            case "YMD": {
                return [yyyy, mm, dd].join(separator);
            }

            case "MDY": {
                return [mm, dd, yyyy].join(separator);
            }

            case "DMY":
            default: {
                return [dd, mm, yyyy].join(separator);
            }
        }
    }

    public override toString(dateFormat: LZDateMode = "DMY", separator: string = "."): string {
        return this.getFormattedDay(dateFormat, separator);
    }

    public override toJson(): string {
        return `${super.toJson()}-${this.formattedDayPart}`;
    }

    public override toLocalNativeDate(): Date {
        return new Date(this.year, this.month, this.day);
    }

    public override toUtcNativeDate(): Date {
        return new Date(Date.UTC(this.year, this.month, this.day));
    }
}

export interface LZDayLike extends LZMonthLike {
    readonly day?: number;
}
