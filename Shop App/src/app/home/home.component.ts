import { Component, OnDestroy, OnInit } from '@angular/core';
import { IProduct } from '../models/Product';
import { ShopService } from '../services/shop.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: IProduct[] = [];
  shoppingCart: IProduct[] = [];
  isLoading: boolean = true;
  constructor(
    private shopService: ShopService
  ) {
  }

  ngOnInit(): void {
    this.shoppingCart = this.shopService.cart;

    this.shopService.getSearchKeywoard().subscribe({
      next: (nextSearchKeyword) => {
        const queryParamas = {
          searchKeyword: nextSearchKeyword
        }
        this.listingProducts(queryParamas);
      }
    })

  }

  listingProducts(params?: { searchKeyword: string }) {
    this.isLoading = true;
    this.shopService.getProducts(params).subscribe({
      next: (data) => {
        this.products = data;
        this.isLoading = false;
      }
    });
  }

  handleClick(product: IProduct): void {
    this.shopService.addToCart(product);
  }

  isAddedToCart(id: number): boolean {
    for (let product of this.shoppingCart) {
      if (product.id === id) return true;
    }

    return false;
  }

}
