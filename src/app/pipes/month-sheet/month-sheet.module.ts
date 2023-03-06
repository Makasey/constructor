import { CommonModule } from "@angular/common";
import { LZMonthSheetPipe } from "./month-sheet.pipe";
import { NgModule } from "@angular/core";

@NgModule({
    imports: [CommonModule],
    declarations: [LZMonthSheetPipe],
    exports: [LZMonthSheetPipe],
})
export class LZMonthSheetPipeModule {}
