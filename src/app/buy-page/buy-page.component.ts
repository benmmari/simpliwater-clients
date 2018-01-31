import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-buy-page',
  templateUrl: './buy-page.component.html',
  styleUrls: ['./buy-page.component.css']
})
export class BuyPageComponent implements OnInit {

  amountRands;
  calculatedEth;

  constructor() {}

  ngOnInit() {}

  calculateETH = () => {
    return (this.amountRands) ? this.amountRands / 12000 : 0;
  }



}
