import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryCatalogRoutingModule } from './category-catalog-routing.module';
import { CategoryCatalogComponent } from './category-catalog.component';


@NgModule({
  declarations: [
    CategoryCatalogComponent
  ],
  imports: [
    CommonModule,
    CategoryCatalogRoutingModule
  ]
})
export class CategoryCatalogModule { }
