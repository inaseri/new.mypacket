import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { Banks } from '../models/banks';

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
  }

  submitForm() {
    console.log('owner/cash/name is:', this.data.owner, this.data.cash_bank, this.data.name_bank);
    this.apiService.createBank(this.data).subscribe((response) => {
      this.router.navigate(['lBanks/']);
    });

  }

}
