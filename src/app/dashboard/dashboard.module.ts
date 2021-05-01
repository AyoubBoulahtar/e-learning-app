import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateCourseComponent } from './create-course/create-course.component';
import { CourseListComponent } from './course-list/course-list.component';



@NgModule({
  declarations: [
    DashboardComponent,
    CreateCourseComponent,
    CourseListComponent,
  ],
  imports: [
  DashboardRoutingModule,
  FormsModule,
  SharedModule
  ]
})
export class DashboardModule { }
