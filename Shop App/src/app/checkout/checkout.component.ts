import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as confetti from 'canvas-confetti';

import { IOrder } from '../models/Order';
import { ShopService } from '../services/shop.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup = this.fb.group({
    street: ['', Validators.required],
    countryName: ['', Validators.required]
  });
  totalPrice: number = 0;
  constructor(
    private fb: FormBuilder,
    private shopService: ShopService,
    private router: Router,
    private renderer2: Renderer2,
    private elementRef: ElementRef
  ) { }

  ngOnInit(): void {
    this.totalPrice = this.shopService.totalPrice;
  }

  onCheckout(): void {
    const selectProductsIds: number[] = this.shopService.cart.map((product) => product.id);
    const userId: number = JSON.parse(localStorage.getItem('currentUser') || "{}").id;

    const formData: IOrder = {
      productIds: selectProductsIds,
      userId,
      ...this.checkoutForm.value
    }

    this.shopService.createOrder(formData).subscribe({
      next: (res) => {
        this.surprise();
        this.shopService.resetCart();
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2000)
      }
    })

  }


  public surprise(): void {

    const canvas = this.renderer2.createElement('canvas');

    this.renderer2.appendChild(this.elementRef.nativeElement, canvas);

    const myConfetti = confetti.create(canvas, {
      resize: true
    });

    myConfetti();
  }
}
