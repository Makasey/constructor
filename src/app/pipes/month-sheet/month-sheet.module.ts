import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LZMonthSheetPipe } from "./month-sheet.pipe";

@NgModule({
    imports: [CommonModule],
    declarations: [LZMonthSheetPipe],
    exports: [LZMonthSheetPipe],
})
export class LZMonthSheetPipeModule {}
