import { Component, OnInit } from '@angular/core';
import {ApiService} from "../services/api.service";

@Component({
  selector: 'app-demands',
  templateUrl: './demands.component.html',
  styleUrls: ['./demands.component.scss']
})
export class DemandsComponent implements OnInit {

  transactionsData: any;
  type = 4;
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
