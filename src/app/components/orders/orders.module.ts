import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {OrdersComponent} from "./orders.component";
import {OrdersService} from "./orders.service";
import {TableModule} from "../table/table.module";
import {StatusComponent} from "../status/status.component";

@NgModule({
  declarations: [
    OrdersComponent,
    StatusComponent,
  ],
  exports: [
    OrdersComponent,
  ],
  imports: [
    CommonModule,
    TableModule,
  ],
  providers: [
    OrdersService
  ],
})

export class OrdersModule {
}
