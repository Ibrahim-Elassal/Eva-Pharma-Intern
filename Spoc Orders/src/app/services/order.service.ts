import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { BehaviorSubject } from "rxjs";
import { IOrder } from "../interfaces/Order";
import { IOrderDetails } from "../interfaces/OrdersDetails";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private AgentName = new BehaviorSubject<string>('');

  authToken :  string | null =  (localStorage.getItem("accesstoken") )  ;
  adminId : number   = +(localStorage.getItem("adminId" ) ||  '{}');
  // order : string =

  constructor(private http: HttpClient ) { }
// order
  getOrder(adminId : number   ){
    return this.http.get <IOrder[]>(environment.baseUrl+`Order/GetOrdersAdmin?AdminId=${this.adminId}`, {
    });
  }
  
// details
  getOrderDetails (id :number   ){
    return this.http.get <IOrderDetails[]> (environment.baseUrl+`Order/GetOrder?OrderId=${id}`);
  } 
//  search 
getOrderBySearch(adminId : number  , params?:{AgentName :string ,AdminId : number } ){
  return this.http.get <IOrder[]>(environment.baseUrl+`Order/GetOrdersAdminByAgentName?`, {
    params : params 
  });
}

  public getSearchKeyword() : BehaviorSubject<string> {
    return this.AgentName ;
  }

  public setSearchKeyword(newValue : string) :void{
    this.AgentName.next(newValue);
  }

}

