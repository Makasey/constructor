import { isNumberInRange, normalizeToIntNumber } from "../../../utils";

export class LZYear implements LzYearLike {
    constructor(public readonly year: number) {}

    public static isValidYear(year: number): boolean {
        return Number.isInteger(year) && isNumberInRange(year, 0, 9999);
    }

    /*
     * Check if year is leap according to Julian calendar
     * */
    public static isLeapYear(year: number): boolean {
        return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
    }

    public static getAbsoluteLeapYears(year: number): number {
        return Math.ceil(year % 400) + (Math.ceil(year / 4) - Math.ceil(year / 100));
    }

    public static lengthBetween(from: LZYear, to: LZYear): number {
        return to.year - from.year;
    }

    protected static normalizeYearPart(year: number): number {
        return normalizeToIntNumber(year, 0, 9999);
    }

    public get formattedYear(): string {
        return String(this.year).padStart(4, "0");
    }

    public get isLeapYear(): boolean {
        return LZYear.isLeapYear(this.year);
    }

    public get absoluteLeapYears(): number {
        return LZYear.getAbsoluteLeapYears(this.year);
    }

    public yearBefore({ year }: LZYear): boolean {
        return this.year < year;
    }

    public yearSameOrBefore({ year }: LZYear): boolean {
        return this.year <= year;
    }

    public yearSame({ year }: LZYear): boolean {
        return this.year === year;
    }

    public yearSameOrAfter({ year }: LZYear): boolean {
        return this.year >= year;
    }

    public yearAfter({ year }: LZYear): boolean {
        return this.year > year;
    }

    public append({ year = 0 }: LzYearLike): LZYear {
        const resultYear = this.year + year;

        return new LZYear(resultYear);
    }

    public toString(): string {
        return this.formattedYear;
    }

    public valueOf(): number {
        return this.year;
    }

    public [Symbol.toPrimitive](hint: string): number | string {
        return Date.prototype[Symbol.toPrimitive].call(this, hint);
    }

    public toJson(): string {
        return this.formattedYear;
    }
}

export interface LzYearLike {
    readonly year?: number;
}
