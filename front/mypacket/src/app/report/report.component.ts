import { Component, OnInit } from '@angular/core';
import {ApiService} from "../services/api.service";
import * as moment from 'jalali-moment';
import { DatePipe } from '@angular/common'
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

      this.incomesData = response;
    });
  }

  getAllExpense() {
    this.apiService.getTransactionsList(2).subscribe(response => {
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

      this.expenseData = response;
    });
  }

  getAllDebits() {
    this.apiService.getTransactionsList(3).subscribe(response => {

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

      this.debitsData = response;
    });
  }

  getAllDemands() {
    this.apiService.getTransactionsList(4).subscribe(response => {
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
      this.demandData = response;
    });
  }
}
