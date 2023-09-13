import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DashboardComponent } from './admin-components/dashboard/dashboard.component';
import { PostUserComponent } from './admin-components/post-user/post-user.component';
import { AdminRoutingModule } from './admin-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {MatNativeDateModule} from '@angular/material/core'
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AllUsersComponent } from './admin-components/all-users/all-users.component';
import {MatCardModule} from '@angular/material/card';
import { UpdateUserComponent } from './admin-components/update-user/update-user.component';



@NgModule({
  declarations: [
    DashboardComponent,
    PostUserComponent,
    PostUserComponent,
    AllUsersComponent,
    UpdateUserComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatSelectModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class AdminModule { }
