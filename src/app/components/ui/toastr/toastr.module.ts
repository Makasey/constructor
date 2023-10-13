import { CommonModule } from "@angular/common";
import { ModuleWithProviders, NgModule } from "@angular/core";

import { LZInitVarDirective } from "@shared-directives";
import {
    LZToastrBoxComponent,
    LZToastrComponent,
    LZToastrItemComponent,
    LZToastrListComponent,
    LZToastrService,
    LZToastrStore,
    LzToastrQuery,
} from "@components";

@NgModule({
    imports: [CommonModule, LZInitVarDirective],
    exports: [LZToastrComponent],
    declarations: [LZToastrBoxComponent, LZToastrComponent, LZToastrItemComponent, LZToastrListComponent],
})
export class LZToastrModule {
    public static forRoot(): ModuleWithProviders<LZToastrModule> {
        return {
            ngModule: LZToastrModule,
            providers: [LZToastrStore, LZToastrService, LzToastrQuery],
        };
    }
}
