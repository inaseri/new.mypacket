import { Component, OnInit } from '@angular/core';
import {ApiService} from "../services/api.service";

declare const require: any;

@Component({
  selector: 'app-expeses',
  templateUrl: './expeses.component.html',
  styleUrls: ['./expeses.component.scss']
})
export class ExpesesComponent implements OnInit {

  transactionsData: any;
  startDate: any;
  endDate: any;
  type = 2;

  constructor(
    public apiService: ApiService
  ) {
    this.transactionsData = [];
  }

  ngOnInit() {
    this.getAllTransactions();
  }

  getDate() {
    const startMonthStr = this.startDate.format('jYYYY/jMM/jD').toString();
    const startMonthNumberStr = startMonthStr.substr(5, 7);
    this.apiService.thisMonth = startMonthNumberStr.slice(0, 2);

    const endMonthStr = this.endDate.format('jYYYY/jMM/jD').toString();
    const endMonthNumberStr = endMonthStr.substr(5, 7);
    this.apiService.nextMonth = endMonthNumberStr.slice(0, 2);

    // the below lines use for update the page
    this.getAllTransactions();
  }

  getAllTransactions() {
    this.apiService.getTransactionsList(this.type).subscribe(response => {
      const jalaali = require('jalaali-js');
      for (const key in response) {
          // check if the property/key is defined in the object itself, not in parent
          if (response.hasOwnProperty(key)) {
              const inDate = response[key].date.toString();
              const inDateFormated = inDate.slice('T', -10);
              const inYear = inDateFormated.substr(0, 4);
              const inMonth = inDateFormated.substr(6,1);
              const inDay = inDateFormated.substr(8, 7);
              const jalaliNewDate = jalaali.toJalaali(Number(inYear), Number(inMonth), Number(inDay));
              const string2 = jalaliNewDate.jy.toString() + "/" + jalaliNewDate.jm.toString() + "/" + jalaliNewDate.jd.toString();
              response[key].date = string2;
          }
      }
      this.transactionsData = response;
    });
  }

  delete(item) {
    this.apiService.deleteTransactions(item.id).subscribe(Response => {
      this.getAllTransactions();
    });
  }
}
