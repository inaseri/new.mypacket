import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../services/api.service";
import {Transactoin} from "../models/transactoin";

@Component({
  selector: 'app-change-transaction',
  templateUrl: './change-transaction.component.html',
  styleUrls: ['./change-transaction.component.scss']
})
export class ChangeTransactionComponent implements OnInit {

  id: number;
  data: Transactoin;

  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public apiService: ApiService
  ) {
    this.data = new Transactoin();
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params["id"];
    this.apiService.getTransactionItem(this.id).subscribe(response => {
      this.data = response;
    });
  }

  update() {
    this.apiService.updateBank(this.id, this.data).subscribe(response => {
      this.router.navigate(['/lBanks']);
    });
  }

}
