import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-lbanks',
  templateUrl: './lbanks.component.html',
  styleUrls: ['./lbanks.component.scss']
})
export class LbanksComponent implements OnInit {

  banksData: any;

  constructor(
    public apiService: ApiService
  ) {
    this.banksData = [];
  }

  ngOnInit() {
    this.getAllBanks();
  }

  //Get saved list of Banks
  getAllBanks() {
    this.apiService.getList(localStorage.getItem('user_id')).subscribe(response => {
      this.banksData = response;
    });
  }

  delete(item) {
    //Delete item in Bank data
    this.apiService.deleteBank(item.id).subscribe(Response => {
      this.getAllBanks();
    });
  }

}
