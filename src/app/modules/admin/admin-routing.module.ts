import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './admin-components/dashboard/dashboard.component';
import { AdminGuard } from 'src/app/auth/guards/admin-guard/admin.guard';
import { PostUserComponent } from './admin-components/post-user/post-user.component';
import { AllUsersComponent } from './admin-components/all-users/all-users.component';
import { UpdateUserComponent } from './admin-components/update-user/update-user.component';

const routes: Routes = [
  {path:"dashboard",component: DashboardComponent, canActivate:[AdminGuard]},
  {path:"user",component:PostUserComponent,canActivate:[AdminGuard]},
  {path:"users",component:AllUsersComponent,canActivate:[AdminGuard]},
  {path:"user/:userId",component:UpdateUserComponent,canActivate:[AdminGuard]}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
