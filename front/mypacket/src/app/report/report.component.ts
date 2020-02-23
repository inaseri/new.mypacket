import { Component, OnInit } from '@angular/core';
import {ApiService} from "../services/api.service";

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
      this.incomesData = response;
    });
  }

  getAllExpense() {
    this.apiService.getTransactionsList(2).subscribe(response => {
      this.expenseData = response;
    });
  }

  getAllDebits() {
    this.apiService.getTransactionsList(3).subscribe(response => {
      this.debitsData = response;
    });
  }

  getAllDemands() {
    this.apiService.getTransactionsList(4).subscribe(response => {
      this.demandData = response;
    });
  }
}
