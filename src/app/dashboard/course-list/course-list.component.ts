import { Component, OnDestroy, OnInit } from '@angular/core';
import { Course } from '../course.model';
import { CourseService } from '../course.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit, OnDestroy {

  isLoading = false;
  courses: Course[] = [];
  private coursesSub: Subscription = new Subscription;

  constructor(public courseService: CourseService) {}

  ngOnInit() {
    this.isLoading = true;
    this.courseService.getCourses();
    this.coursesSub = this.courseService.getCourseUpdateListener()
    .subscribe((courses: Course[]) => {
      this.isLoading = false;
      this.courses = courses;
    });
  }

  onDelete(courseId: string) {
    this.courseService.deleteCourse(courseId);
  }

  ngOnDestroy() {
    this.coursesSub.unsubscribe();
  }

}
