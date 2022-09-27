import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IOrderDetails } from '../interfaces/OrdersDetails';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  public orderId : number 
  public orderDetails :IOrderDetails  = {} as IOrderDetails ;
  public loading: boolean = false;

  constructor(private route : ActivatedRoute , private orderService : OrderService   ) { 
    this.orderId = +(this.route.snapshot.paramMap.get('id') ||  '')  ;
    console.log(this.orderId);
  }

   ngOnInit(): void {
    this.getSingleOrder()
  }
  
 public getSingleOrder(){
    this.loading=true;
    this.orderService.getOrderDetails(this.orderId).subscribe(
     (res:any)=>{
      console.log(res);
      this.orderDetails=res;
      this.loading=false;
    }
    )
  }
}
