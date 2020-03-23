import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { Banks } from '../models/banks';

declare const $: any;

@Component({
  selector: 'app-abank',
  templateUrl: './abank.component.html',
  styleUrls: ['./abank.component.scss']
})

export class AbankComponent implements OnInit {

  data: Banks;

  constructor(
    public apiService: ApiService,
    public router: Router
  ) {
    this.data = new Banks();
    this.data.owner = apiService.user.toString();
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
  }

  submitForm() {
    let cash = this.data.cash_bank.toString();
    cash = cash.replace(',','');
    this.data.cash_bank = Number(cash);
    this.apiService.createBank(this.data).subscribe((response) => {
      this.router.navigate(['lBanks']);
    });

  }

}
