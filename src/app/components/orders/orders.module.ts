import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {OrdersComponent} from "./orders.component";
import {OrdersService} from "./orders.service";
import {TableModule} from "../table/table.module";
import {StatusModule} from "../status/status.module";

@NgModule({
  declarations: [
    OrdersComponent,
  ],
  exports: [
    OrdersComponent,
  ],
  imports: [
    CommonModule,
    TableModule,
    StatusModule,
  ],
  providers: [
    OrdersService,
  ],
})

export class OrdersModule {
}
