import { LZYear, LzYearLike } from "./year";
import { MonthNumber } from "../enum";
import { isNumberInRange, normalizeToIntNumber } from "../../../utils";

export class LZMonth extends LZYear implements LZMonthLike {
    constructor(public readonly year: number, public readonly month: number) {
        super(year);
    }

    public static isValidMonth(year: number, month: number): boolean {
        return LZYear.isValidYear(year) && LZMonth.isValidMonthPart(month);
    }

    public static getMonthDaysCount(month: number, isLeapYear: boolean): number {
        switch (month) {
            case MonthNumber.FEBRUARY: {
                return isLeapYear ? 29 : 28;
            }

            case MonthNumber.APRIL:
            case MonthNumber.JUNE:
            case MonthNumber.SEPTEMBER:
            case MonthNumber.NOVEMBER: {
                return 30;
            }

            default: {
                return 31;
            }
        }
    }

    public static currentLocal(): LZMonth {
        const nativeDate = new Date();

        return new LZMonth(nativeDate.getFullYear(), nativeDate.getMonth());
    }

    public static currentUtc(): LZMonth {
        const nativeDate = new Date();

        return new LZMonth(nativeDate.getUTCFullYear(), nativeDate.getUTCMonth());
    }

    public static override lengthBetween(from: LZMonth, to: LZMonth): number {
        const absoluteFrom = from.month + from.year * 12;
        const absoluteTo = to.month + to.year * 12;

        return absoluteTo - absoluteFrom;
    }

    protected static normalizeMonthPart(month: number): number {
        return normalizeToIntNumber(month, 0, 11);
    }

    private static isValidMonthPart(month: number): boolean {
        return Number.isInteger(month) && isNumberInRange(month, 0, 11);
    }

    public get formattedMonthPart(): string {
        return String(this.month + 1).padStart(2, "0");
    }

    public get daysCount(): number {
        return LZMonth.getMonthDaysCount(this.month, this.isLeapYear);
    }

    public monthBefore(anotherMonth: LZMonth): boolean {
        return this.yearBefore(anotherMonth) || (this.yearSame(anotherMonth) && this.month < anotherMonth.month);
    }

    public monthBeforeOrSame(anotherMonth: LZMonth): boolean {
        return this.yearBefore(anotherMonth) || (this.yearSame(anotherMonth) && this.month <= anotherMonth.month);
    }

    public monthSame(anotherMonth: LZMonth): boolean {
        return this.yearSame(anotherMonth) && this.month === anotherMonth.month;
    }

    public monthAfterOrSame(anotherMonth: LZMonth): boolean {
        return this.yearAfter(anotherMonth) || (this.yearSame(anotherMonth) && this.month >= anotherMonth.month);
    }

    public monthAfter(anotherMonth: LZMonth): boolean {
        return this.yearAfter(anotherMonth) || (this.yearSame(anotherMonth) && this.month > anotherMonth.month);
    }

    public override append({ year = 0, month = 0 }: LZMonthLike): LZMonth {
        const totalMonths = (this.year + year) * 12 + this.month + month;

        return new LZMonth(Math.floor(totalMonths / 12), totalMonths % 12);
    }

    public override toString(): string {
        return `${this.formattedMonthPart}.${this.formattedYear}`;
    }

    public override valueOf(): number {
        return this.toLocalNativeDate().valueOf();
    }

    public override toJson(): string {
        return `${super.toJson()}-${this.formattedMonthPart}`;
    }

    public toLocalNativeDate(): Date {
        return new Date(this.year, this.month);
    }

    public toUtcNativeDate(): Date {
        return new Date(Date.UTC(this.year, this.month));
    }
}

export interface LZMonthLike extends LzYearLike {
    readonly month?: number;
}
