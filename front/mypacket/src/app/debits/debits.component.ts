import { Component, OnInit } from '@angular/core';
import { ApiService } from "../services/api.service";


declare const require: any;

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
