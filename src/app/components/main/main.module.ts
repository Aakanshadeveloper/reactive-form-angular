import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NativeDateAdapter} from '@angular/material/core';

import { MainRoutingModule } from './main-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { AddEditFormComponent } from './add-edit-form/add-edit-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    AddEditFormComponent,

  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule
  ],
  providers: [],
})
export class MainModule { }
