import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CommonModule } from "@angular/common";
import { LZInitVarModule } from "../../../directive/init-var/init-var.module";
import { LZToastrBoxComponent } from "./components/toastr-box/toastr-box.component";
import { LZToastrComponent } from "./toastr.component";
import { LZToastrItemComponent } from "./components/toastr-item/toastr-item.component";
import { LZToastrListComponent } from "./components/toastr-list/toastr-list.component";
import { LZToastrService } from "./store/toastr.service";
import { LZToastrStore } from "./store/toastr.store";
import { LzToastrQuery } from "./store/toastr.query";
import { ModuleWithProviders, NgModule } from "@angular/core";

@NgModule({
    imports: [CommonModule, LZInitVarModule, BrowserAnimationsModule],
    providers: [],
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
