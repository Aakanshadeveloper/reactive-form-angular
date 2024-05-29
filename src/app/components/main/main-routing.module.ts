import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddEditFormComponent } from './add-edit-form/add-edit-form.component';
const routes: Routes = [
{path: '', component: HomeComponent,
children:[
{path:'',component: DashboardComponent},
{path:'form',component: AddEditFormComponent}
]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
