import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ApiService} from "../services/api.service";
import {Transactoin} from "../models/transactoin";

declare const $: any;

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
    $('input.number').keyup(function(event) {
      // skip for arrow keys
      if(event.which >= 37 && event.which <= 40) return;

      // format number
      $(this).val(function(index, value) {
        return value
        .replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        ;
      });
    });
    this.getAllBanks();
  }

  submitForm() {
    let cash = this.data.cash.toString();
    cash = cash.toString().replace(',','');
    this.data.cash = Number(cash);
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
