import { Component, OnInit } from '@angular/core';
import { User } from "../models/user";

import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restpasswordform',
  templateUrl: './restpasswordform.component.html',
  styleUrls: ['./restpasswordform.component.scss']
})
export class RestpasswordformComponent implements OnInit {

  data: User;

  constructor(
    public apiService: ApiService,
    public router: Router,
  ) {
    this.data = new User();
  }

  ngOnInit() {
  }

  setNewPass() {
    this.apiService.setPassword(this.data).subscribe(response => {
      this.router.navigate(['']);
    });
  }

}
