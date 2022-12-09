import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestComponent } from './test.component';
import {Route, RouterModule} from "@angular/router";

const ROUTES: Route[] = [
  {
    path: '',
    component: TestComponent,
  }
]

@NgModule({
  declarations: [
    TestComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
  ],
  exports: [RouterModule],
})
export class TestModule { }
