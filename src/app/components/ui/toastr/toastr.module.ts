import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CommonModule } from "@angular/common";
import { ModuleWithProviders, NgModule } from "@angular/core";

import { LZInitVarModule } from "app/directive/init-var/init-var.module";

import { LZToastrBoxComponent, LZToastrItemComponent, LZToastrListComponent } from "./components";
import { LZToastrComponent } from "./toastr.component";
import { LZToastrService, LZToastrStore, LzToastrQuery } from "./store";

@NgModule({
    imports: [CommonModule, LZInitVarModule, BrowserAnimationsModule],
    exports: [LZToastrComponent],
    declarations: [LZToastrComponent, LZToastrItemComponent, LZToastrBoxComponent, LZToastrListComponent],
})
export class LZToastrModule {
    public static forRoot(): ModuleWithProviders<LZToastrModule> {
        return {
            ngModule: LZToastrModule,
            providers: [LZToastrStore, LZToastrService, LzToastrQuery],
        };
    }
}
