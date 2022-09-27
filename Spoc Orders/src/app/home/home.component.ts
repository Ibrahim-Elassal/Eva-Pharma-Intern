import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { OrderService } from '../services/order.service';
import {  Router } from '@angular/router';
import { IOrder } from '../interfaces/Order';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public orders : IOrder [] = [] ;
  public loading: boolean = true;
  
  constructor(private orderService : OrderService ,    private router: Router) { }
  private adminId : number = +(localStorage.getItem("adminId" ) ||  '{}');

  ngOnInit(): void {
    this.getOrders(this.adminId);
    this.getOrdersBySearch();

  }
  // get all Orders without Details
  public getOrders(adminId : number){
    this.orderService.getOrder(adminId).subscribe({
      next:(res)=>{
        this.orders = res ;
        this.loading=false;
         }
    }
    )
  }
  //Two Fun to get orders By Search 
  public getOrdersAfterSearch(adminId : number ,   params?:{AgentName :string ,AdminId : number }){
    this.orderService.getOrderBySearch(adminId , params).subscribe({
      next:(res)=>{
        this.orders = res ;
      }
    }
    )
  }
  public getOrdersBySearch(){
    this.orderService.getSearchKeyword().subscribe({
      next: (nextSearchKeyword)=>{
        const queryParamas = {
          AgentName : nextSearchKeyword ,
          AdminId : this.adminId
        }
        this.getOrdersAfterSearch(this.adminId ,queryParamas );
      }
    })
  }
}