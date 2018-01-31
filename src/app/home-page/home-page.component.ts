import { Component, OnInit, NgZone } from '@angular/core';
import { SimpliwaterService } from '../simpliwater.service';
import {
  Router,
  NavigationExtras
} from '@angular/router';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  meterStats: any;
  utilityStats: any;
  dailyLimit: number;

  constructor(private _ngZone: NgZone, public router: Router, private simpliwaterService: SimpliwaterService) {}

  ngOnInit() {
    this.meterStats = this.simpliwaterService.getMeterStats();
    console.log(this.meterStats);
    if (this.simpliwaterService.hasEmitted()) {
      this.utilityStats = this.simpliwaterService.getUtilityConstants();
      console.log(this.simpliwaterService.getUtilityConstants());
    } else {
      this.simpliwaterService.contractReady.subscribe(
        () => {
          console.log("ready");
          this.utilityStats = this.simpliwaterService.getUtilityConstants();
        });
    }
  }

  howManyDays() {
    let currentTime = Date.now();
    let meterEpochTime = this.meterStats.registrationEpoch;
    console.log("days", (currentTime - meterEpochTime) / 86400000);
    return (currentTime - meterEpochTime) / 86400000;
  }

  usagePerDay() {
    return this.utilityStats.usage > 0 ? this.utilityStats.usage/this.howManyDays() : 0;
  }

  buyTokens() {
    this.router.navigate(["buy/"]);
  }

}
