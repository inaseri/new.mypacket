import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import {Banks} from '../models/banks';
import {BankToBank} from '../models/bank-to-bank';

@Component({
  selector: 'app-bank-to-bank',
  templateUrl: './bank-to-bank.component.html',
  styleUrls: ['./bank-to-bank.component.scss']
})
export class BankToBankComponent implements OnInit {

  banksData: Banks;
  newBankData: BankToBank;

  constructor(
    public apiService: ApiService,
    public router: Router
  ) {
    this.newBankData = new BankToBank();
  }

  ngOnInit() {
    this.getAllBanks();
  }

  submitForm() {
    this.apiService.bankToBank(this.newBankData, this.newBankData.id1, this.newBankData.id2).subscribe(response => {
      this.router.navigate(['/lBanks']);
    });
  }

  getAllBanks() {
    this.apiService.getList().subscribe(response => {
      this.banksData = response;
    });
  }
}
