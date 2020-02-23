import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ApiService} from "../services/api.service";
import {Transactoin} from "../models/transactoin";


@Component({
  selector: 'app-addtransaction',
  templateUrl: './addtransaction.component.html',
  styleUrls: ['./addtransaction.component.scss']
})

export class AddtransactionComponent implements OnInit {

  data: Transactoin;
  typeOfTransaction = 1;
  banksData: any;

  constructor(
    public apiService: ApiService,
    public router: Router
  ) {
    this.data = new Transactoin();
    this.data.owner = apiService.user.toString();
    this.data.type = 1;
  }

  ngOnInit() {
    this.getAllBanks();
  }

  submitForm() {
    this.apiService.createTransaction(this.data, this.typeOfTransaction).subscribe((response) => {
      this.router.navigate(['report/']);
    });
  }


  getAllBanks() {
    this.apiService.getList().subscribe(response => {
      this.banksData = response;
    });
  }
}
