import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-lbanks',
  templateUrl: './lbanks.component.html',
  styleUrls: ['./lbanks.component.scss']
})
export class LbanksComponent implements OnInit {

  banksData: any;

  public doughnutChartType = 'doughnut';
  public doughnutChartLabels = [];
  public doughnutChartData = [];

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
    this.apiService.getList().subscribe(response => {
      this.banksData = response;
      const arrOfLabels = [];
      const arrOfValues = [];
      for (const key1 in this.banksData) {
        arrOfLabels.push(this.banksData[key1].name_bank);
        arrOfValues.push(this.banksData[key1].cash_bank);
      }
      this.doughnutChartLabels = arrOfLabels;
      this.doughnutChartData = arrOfValues;
    });
  }

  delete(item) {
    //Delete item in Bank data
    this.apiService.deleteBank(item.id).subscribe(Response => {
      this.getAllBanks();
    });
  }

}
