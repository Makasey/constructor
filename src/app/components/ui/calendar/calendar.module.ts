import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { LZCalendarComponent, LZMonthSheetPipeModule } from "@components";

@NgModule({
    imports: [CommonModule, LZMonthSheetPipeModule],
    declarations: [LZCalendarComponent],
    exports: [LZCalendarComponent],
})
export class LZCalendarModule {}
