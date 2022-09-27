import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IProduct } from '../models/Product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() cardDetails: IProduct = {
    id: 0,
    name: '',
    madeIn: '',
    price: 0
  };

  @Input() CTA_text: string = '';
  @Input() isClickable: boolean = true;

  @Output() theButtonWasClicked = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  handleClickCardButton() {
    this.theButtonWasClicked.emit();
    console.log("Hi");
  }

}
