import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { IUser } from "../models/User";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  // private userId: number | null = null;
  private userId = new BehaviorSubject<number | null>(JSON.parse(localStorage.getItem('currentUser') || '{}').id);
  private baseURL: string = 'https://hackathonapis.azurewebsites.net/api/User';

  constructor(
    private http: HttpClient
  ) {

  }

  getUserId(): BehaviorSubject<number | null> {
    return this.userId;
  }

  setUserId(id: number): void {
    this.userId.next(id);
    // this.userId = id;
  }

  createUser(formData: any) {
    return this.http.post(`${this.baseURL}/Signup`, formData);
  }

  login(formData: any) {
    return this.http.post<IUser>(`${this.baseURL}/Login`, formData)
  }
  
}