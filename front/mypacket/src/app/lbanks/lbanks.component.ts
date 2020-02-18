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
    this.getAllStudents();
  }

  //Get saved list of Banks
  getAllStudents() {
    this.apiService.getList().subscribe(response => {
      this.banksData = response;
    });
  }

}
