import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Transactoin} from "../models/transactoin";
import {ApiService} from "../services/api.service";

@Component({
  selector: 'app-adddebit',
  templateUrl: './adddebit.component.html',
  styleUrls: ['./adddebit.component.scss']
})
export class AdddebitComponent implements OnInit {

  data: Transactoin;
  typeOfTransaction = 3;
  banksData: any;

  constructor(
    public apiService: ApiService,
    public router: Router
  ) {
    this.data = new Transactoin();
    this.data.owner = apiService.user.toString();
    this.data.type = 3;
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
