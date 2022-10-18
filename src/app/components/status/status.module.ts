import {NgModule} from "@angular/core";
import {StatusComponent} from "./status.component";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    StatusComponent,
  ],
  exports: [
    StatusComponent,
  ],
  imports: [
    CommonModule,
  ],
})

export class StatusModule{
}
