import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { AuthData, LoginData } from './auth-data.model';
import { Subject } from "rxjs";

@Injectable({ providedIn: "root" })
export class AuthService {

  private token: string;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  getToken() {
    return this.token;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(firstName: string, lastName: string, email: string, password: string) {
    const authData: AuthData = {firstName: firstName, lastName: lastName, email: email, password: password};
    this.http
    .post("http://localhost:3000/api/signup", authData)
    .subscribe(response => {
      console.log(response);
    });
  }

  login(email: string, password: string) {
    const loginData: LoginData = {email: email, password: password};
    this.http
    .post<{token: string}>("http://localhost:3000/api/login", loginData)
    .subscribe(response => {
      console.log(response)
      const token = response.token;
      this.token = token;
      this.authStatusListener.next(true);
    });
  }
}
