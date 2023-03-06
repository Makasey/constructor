import { CommonModule } from "@angular/common";
import { LZCalendarComponent } from "./calendar.component";
import { LZMonthSheetPipeModule } from "./pipes/month-sheet.module";
import { NgModule } from "@angular/core";

@NgModule({
    imports: [CommonModule, LZMonthSheetPipeModule],
    declarations: [LZCalendarComponent],
    exports: [LZCalendarComponent],
})
export class LZCalendarModule {}
