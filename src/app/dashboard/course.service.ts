import { Injectable } from '@angular/core';
import { Course } from './course.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private courses: Course[] = [];
  private coursesUpdated = new Subject<Course[]>();

  constructor(private http: HttpClient, private router: Router) { }

  getCourses() {
    this.http.get<any[]>('http://localhost:3000/api/courses')
      .subscribe((courseData) => {
        this.courses = courseData;
        this.coursesUpdated.next([...this.courses]);
      });
  }

  getCourseUpdateListener() {
    return this.coursesUpdated.asObservable();
  }

  getCourse(courseId: string) {
    return this.http.get<{
      _id: string,
      title: string,
      instructor: string,
      description: string,
      details: string}>
    ('http://localhost:3000/api/courses/' + courseId);
  }

  createCourse(course: Course) {
    this.http.post<Course>('http://localhost:3000/api/courses',course)
      .subscribe((courseData) => {
        console.log(courseData)
        this.courses.push(course);
        this.coursesUpdated.next([...this.courses]);
        this.router.navigate(["/dashboard"]);
      });
  }

  patchCourse(courseId: string, course: Course) {
    this.http.patch('http://localhost:3000/api/courses/' + courseId, course)
    .subscribe(response => {
      const updatedCourses = [...this.courses];
      const oldCourseIndex = updatedCourses.findIndex(c => c._id === courseId);
      updatedCourses[oldCourseIndex] = course;
      this.courses = updatedCourses;
      this.coursesUpdated.next([...this.courses]);
      this.router.navigate(["/dashboard"]);
    });
  }

  deleteCourse(courseId: string) {
    this.http.delete('http://localhost:3000/api/courses/' + courseId)
    .subscribe(() => {
      const updatedCourses = this.courses.filter(course => course._id !== courseId);
      this.courses = updatedCourses;
      this.coursesUpdated.next([...this.courses]);
    });
  }
}
