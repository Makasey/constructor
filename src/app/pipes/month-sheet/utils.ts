import { DayOfWeek } from "./enum";
import { LZDay } from "./classes/day";
import { LZMonth } from "./classes/month";

const getMonthStartDaysOffset = (month: LZMonth, firstDayOfWeek: DayOfWeek): number => {
    const startMonthOffsetFromSunday = new Date(month.year, month.month, 1).getDay();

    return startMonthOffsetFromSunday >= firstDayOfWeek
        ? startMonthOffsetFromSunday - firstDayOfWeek
        : 7 - (firstDayOfWeek - startMonthOffsetFromSunday);
};
export function getDayFromMonthRowCol({
    month,
    rowIndex,
    colIndex,
    firstDayOfWeek,
}: {
    month: LZMonth;
    rowIndex: number;
    colIndex: number;
    firstDayOfWeek: DayOfWeek;
}): LZDay {
    let day = rowIndex * 7 + colIndex - getMonthStartDaysOffset(month, firstDayOfWeek) + 1;

    if (day > month.daysCount) {
        day -= month.daysCount;
        month = month.append({ month: 1 });
    }

    if (day <= 0) {
        month = month.append({ month: -1 });
        day = month.daysCount + day;
    }

    return new LZDay(month.year, month.month, day);
}
