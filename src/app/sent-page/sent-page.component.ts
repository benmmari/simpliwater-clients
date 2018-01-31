import { Component, OnInit } from '@angular/core';
import {
  Router,
  NavigationExtras
} from '@angular/router';


@Component({
  selector: 'app-sent-page',
  templateUrl: './sent-page.component.html',
  styleUrls: ['./sent-page.component.css']
})
export class SentPageComponent implements OnInit {

  litres: any;
  randAmount;
  ETHAmount;

  constructor(public router: Router,) {}

  ngOnInit() {}

  done() {
    this.router.navigate(["meter/"]);
  }

  more() {
    this.router.navigate(["buy/"]);
  }

}
