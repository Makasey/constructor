import { CommonModule } from "@angular/common";
import { LZAbstractLoginService, LZDefaultLoginService } from "./login.service";
import { LZLoginComponent } from "./login.component";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    imports: [CommonModule, ReactiveFormsModule, LZLoginComponent],
    providers: [
        {
            provide: LZAbstractLoginService,
            useClass: LZDefaultLoginService,
        },
    ],
    exports: [LZLoginComponent],
})
export class LZLoginModule {}
