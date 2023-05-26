import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CommonModule } from "@angular/common";
import { ModuleWithProviders, NgModule } from "@angular/core";

import { LZInitVarDirective } from "@shared-directives/init-var/init-var.directive";

import { LZToastrBoxComponent, LZToastrItemComponent, LZToastrListComponent } from "./components";
import { LZToastrComponent } from "./toastr.component";
import { LZToastrService, LZToastrStore, LzToastrQuery } from "./store";

@NgModule({
    imports: [BrowserAnimationsModule, CommonModule, LZInitVarDirective],
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
