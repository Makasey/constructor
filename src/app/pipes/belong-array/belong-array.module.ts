import { NgModule } from "@angular/core";

import { BelongArrayPipe } from "./belong-array.pipe";

@NgModule({
    declarations: [BelongArrayPipe],
    exports: [BelongArrayPipe],
})
export class BelongArrayPipeModule {}
