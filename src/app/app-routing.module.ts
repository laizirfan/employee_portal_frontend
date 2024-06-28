import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { EmployeComponent } from './employe/employe.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'dashboard',component:HomeComponent},
  {path:'employee',component:EmployeComponent},
  {path:'add',component:AddComponent},
  {path:'edit/:id', component:EditComponent},
  {path:"**",component:PagenotfoundComponent}


];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
