import { NgModule } from "@angular/core";

import { NumberToArrayPipe } from "./number-to-array.pipe";

@NgModule({
    declarations: [NumberToArrayPipe],
    exports: [NumberToArrayPipe],
})
export class NumberToArrayModule {}
