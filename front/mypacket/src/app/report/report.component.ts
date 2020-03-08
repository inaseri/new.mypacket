import { Component, OnInit } from '@angular/core';
import {ApiService} from "../services/api.service";

declare const require: any;

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  incomesData: any;
  expenseData: any;
  debitsData: any;
  demandData: any;

  constructor(
    public apiService: ApiService
  ) {
    this.incomesData = [];
    this.expenseData = [];
    this.debitsData = [];
    this.demandData = [];

  }

  ngOnInit() {
    this.getAllIncomes();
    this.getAllExpense();
    this.getAllDebits();
    this.getAllDemands();
  }

  getAllIncomes() {
    this.apiService.getTransactionsList(1).subscribe(response => {
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
      this.incomesData = response;
    });
  }

  getAllExpense() {
    this.apiService.getTransactionsList(2).subscribe(response => {
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
      this.expenseData = response;
    });
  }

  getAllDebits() {
    this.apiService.getTransactionsList(3).subscribe(response => {
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
      this.debitsData = response;
    });
  }

  getAllDemands() {
    this.apiService.getTransactionsList(4).subscribe(response => {
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
      this.demandData = response;
    });
  }
}
