import { Pipe, PipeTransform } from "@angular/core";

import { DayOfWeek, LZDay, LZMonth, getDayFromMonthRowCol } from "@components";

@Pipe({
    name: "lzMonthSheet",
    pure: true,
    standalone: true,
})
export class LZMonthSheetPipe implements PipeTransform {
    private currentMonth: LZMonth | null = null;

    private currentSheet: LZDay[][] = [];

    public transform(month: LZMonth, showAdjacentDays: boolean = true): LZDay[][] {
        if (this.currentMonth === month) {
            return this.currentSheet;
        }

        const sheet: LZDay[][] = [];

        for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
            const row: LZDay[] = [];

            for (let colIndex = 0; colIndex < 7; colIndex++) {
                const day = getDayFromMonthRowCol({
                    month,
                    rowIndex,
                    colIndex,
                    firstDayOfWeek: DayOfWeek.MONDAY,
                });

                const isPrevMonthDay = (day: LZDay, relativeToMonth = month): boolean =>
                    day.year < relativeToMonth.year || day.month < relativeToMonth.month;

                const isNextMonthDay = (day: LZDay, relativeToMonth = month): boolean =>
                    day.year > relativeToMonth.year || day.month > relativeToMonth.month;

                if (isNextMonthDay(day) && !showAdjacentDays) {
                    break;
                }

                const condition = isPrevMonthDay(day) && !showAdjacentDays;

                if (!condition) {
                    row.push(day);
                }
            }

            sheet.push(row);
        }

        this.currentSheet = sheet.filter(row => row.length);
        this.currentMonth = month;

        return sheet;
    }
}
