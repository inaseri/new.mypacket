import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Transactoin} from "../models/transactoin";
import {ApiService} from "../services/api.service";

@Component({
  selector: 'app-adddemand',
  templateUrl: './adddemand.component.html',
  styleUrls: ['./adddemand.component.scss']
})
export class AdddemandComponent implements OnInit {

  data: Transactoin;
  typeOfTransaction = 4;
  banksData: any;

  constructor(
    public apiService: ApiService,
    public router: Router
  ) {
    this.data = new Transactoin();
    this.data.owner = apiService.user.toString();
    this.data.type = 4;
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
