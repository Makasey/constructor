import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCartComponent } from './product-cart.component';



@NgModule({
  declarations: [
    ProductCartComponent
  ],
  exports: [
    ProductCartComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ProductCartModule { }
