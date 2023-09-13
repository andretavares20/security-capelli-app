import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './user-components/dashboard/dashboard.component';
import { UserGuard } from 'src/app/auth/guards/user-guard/user.guard';

const routes: Routes = [
  {path:"dashboard",component: DashboardComponent, canActivate:[UserGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
