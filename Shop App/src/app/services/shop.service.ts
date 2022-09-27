import { Injectable } from "@angular/core";
import { IProduct } from "../models/Product";
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from "rxjs";
import { IOrder } from "../models/Order";

@Injectable({
  providedIn: 'root'
})

export class ShopService {
  private searchKeyword = new BehaviorSubject<string>('');
  public cart: IProduct[] = JSON.parse(localStorage.getItem('cachedCart') || "[]");
  public totalPrice: number = +(localStorage.getItem('totalPrice') || "0");
  public baseURL: string = 'https://hackathonapis.azurewebsites.net/api';

  constructor(
    private http: HttpClient
  ) {

  }

  public addToCart(product: IProduct): void {
    this.cart.push(product);
    this.totalPrice += product.price;

    localStorage.setItem("cachedCart", JSON.stringify(this.cart));
    localStorage.setItem("totalPrice", "" + this.totalPrice);
  }

  public removeFromCart(productID: number): void {
    this.cart = this.cart.filter((product) => {
      if (product.id === productID) {
        this.totalPrice -= product.price;
        return false;
      }
      return true;
    });

    localStorage.setItem("cachedCart", JSON.stringify(this.cart));
    localStorage.setItem("totalPrice", "" + this.totalPrice);
  }

  public getProducts(metaData?: { searchKeyword: string }) {
    return this.http.get<IProduct[]>(`${this.baseURL}/Product/ProductsList`, {
      params: metaData
    });
  }

  public createOrder(formData: IOrder) {
    return this.http.post(`${this.baseURL}/Order/Createorder`, formData)
  }

  public getSearchKeywoard(): BehaviorSubject<string> {
    return this.searchKeyword;
  }

  public setSearchKeyword(newValue: string): void {
    this.searchKeyword.next(newValue);
  }

  public resetCart() {
    this.cart = [];
    this.totalPrice = 0;
    localStorage.removeItem('cachedCart');
    localStorage.removeItem('totalPrice');
  }
}