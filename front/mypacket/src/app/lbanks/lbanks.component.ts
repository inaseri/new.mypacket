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
    this.apiService.getList().subscribe(response => {
      var jalaali = require('jalaali-js');

      for (let dates of response) {
        var inDate = dates.date.toString();
        var inDateFormated = inDate.slice('T', -10);
        var inYear = inDateFormated.substr(0, 4);
        var inMonth = inDateFormated.substr(6,1);
        var inDay = inDateFormated.substr(8, 7);
        var jalaliNewDate = jalaali.toJalaali(Number(inYear), Number(inMonth), Number(inDay));
        var jaliDateStr = jalaliNewDate.jy.toString() + "/" + jalaliNewDate.jm.toString() + "/" + jalaliNewDate.jd.toString();
        dates.date = jaliDateStr;
      }
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
