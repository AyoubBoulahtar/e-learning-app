import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateCourseComponent } from './create-course/create-course.component';

import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path:'dashboard/create-course', component: CreateCourseComponent },
  { path:'dashboard/edit-course/:courseId', component: CreateCourseComponent }
  ];

@NgModule({
    imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutingModule { }
