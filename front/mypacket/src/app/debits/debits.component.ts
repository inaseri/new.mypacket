import { Component, OnInit } from '@angular/core';
import {ApiService} from "../services/api.service";

@Component({
  selector: 'app-debits',
  templateUrl: './debits.component.html',
  styleUrls: ['./debits.component.scss']
})


export class DebitsComponent implements OnInit {

  transactionsData: any;
  type = 3;
  constructor(
    public apiService: ApiService
  ) {
    this.transactionsData = [];
  }

  ngOnInit() {
    this.getAllTransactions();
  }

  getAllTransactions() {
    this.apiService.getTransactionsList(this.type).subscribe(response => {
      var jalaali = require('jalaali-js');

      for (let dates of response) {
        var inDate = dates.date.toString();
        var inDateFormated = inDate.slice('T', -10);
        var inYear = inDateFormated.substr(0, 4);
        var inMonth = inDateFormated.substr(6,1);
        var inDay = inDateFormated.substr(8, 7);
        var jalaliNewDate = jalaali.toJalaali(Number(inYear), Number(inMonth), Number(inDay));
        var jaliDateStr = jalaliNewDate.jy.toString() + "/" + jalaliNewDate.jm.toString() + "/" + jalaliNewDate.jd.toString();
        dates.date = jaliDateStr;
      }

      this.transactionsData = response;
    });
  }

  delete(item) {
    //Delete item in Bank data
    this.apiService.deleteTransactions(item.id).subscribe(Response => {
      this.getAllTransactions();
    });
  }
}
