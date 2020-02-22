import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Banks } from '../models/banks';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-change-bank',
  templateUrl: './change-bank.component.html',
  styleUrls: ['./change-bank.component.scss']
})

export class ChangeBankComponent implements OnInit {

  id: number;
  data: Banks;

  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public apiService: ApiService
  ) {
    this.data = new Banks();
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params["id"];
    this.apiService.getBaknItem(this.id).subscribe(response => {
      console.log('Cash bank was:', response.cash_bank);
      this.data = response;
    });
  }

  update() {
    this.apiService.updateBank(this.id, this.data).subscribe(response => {
      this.router.navigate(['/lBanks']);
    });
  }

}
