import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { LZCalendarComponent } from "./calendar.component";
import { LZMonthSheetPipeModule } from "./pipes/month-sheet.module";

@NgModule({
    imports: [CommonModule, LZMonthSheetPipeModule],
    declarations: [LZCalendarComponent],
    exports: [LZCalendarComponent],
})
export class LZCalendarModule {}
