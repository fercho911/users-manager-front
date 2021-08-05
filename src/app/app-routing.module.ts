import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UsersManagementComponent} from "./components/users-management/users-management.component";

const routes: Routes = [
  { path: '', redirectTo: 'tutorials', pathMatch: 'full' },
  { path: 'usersList', component: UsersManagementComponent },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
