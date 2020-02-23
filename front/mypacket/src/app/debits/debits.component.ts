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
