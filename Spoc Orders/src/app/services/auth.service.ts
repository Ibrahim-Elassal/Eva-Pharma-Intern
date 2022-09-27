import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { IUserData } from "../interfaces/UserData";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(formData: any) {
    return this.http.post <IUserData []> (environment.baseUrl+`Admin/LoginAdmin`, formData) 
  }

  getToken (){
    return localStorage.getItem("accesstoken")
  }

}