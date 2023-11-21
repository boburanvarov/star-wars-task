import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import {SpinnerComponent} from '../components/spinner/spinner.component';
import {AllListsComponent} from '../components/all-lists/all-lists.component';



@NgModule({
  declarations: [
    SpinnerComponent,
    AllListsComponent,
  ],
  exports: [
    AllListsComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ]
})
export class SharedModule { }
