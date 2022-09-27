import { Component, OnInit } from '@angular/core';
import { OrderDetailsComponent } from '../order-details/order-details.component';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public searchname: string = '' ;
  constructor(private orderService : OrderService) { }

  ngOnInit(): void {
  }

  public onSearching() : void {
      this.orderService.setSearchKeyword(this.searchname)
  }

}
