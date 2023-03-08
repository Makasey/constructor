import { NgModule } from "@angular/core";

import { LZInitVarDirective } from "./init-var.directive";

@NgModule({
    declarations: [LZInitVarDirective],
    exports: [LZInitVarDirective],
})
export class LZInitVarModule {}
