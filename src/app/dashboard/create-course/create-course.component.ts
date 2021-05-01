import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Course } from '../course.model';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit {

  private mode : string = 'create';
  private courseId: string;
  course: Course;
  isLoading = false;

  constructor(public courseService: CourseService, public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('courseId')) {
        this.mode = 'edit';
        this.courseId = paramMap.get('courseId');
        this.isLoading = true;
        this.courseService.getCourse(this.courseId).subscribe(courseData => {
          this.isLoading = false;
          this.course = {_id: courseData._id, title: courseData.title, instructor: courseData.instructor, description: courseData.description, details: courseData.details};
        });
      } else {
        this.mode = 'create';
        this.courseId = null;
      }
    });
  }

  onSaveCourse(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.courseService.createCourse(form.value);
    } else {
      this.courseService.patchCourse(this.courseId, form.value);
      }
    }
}
