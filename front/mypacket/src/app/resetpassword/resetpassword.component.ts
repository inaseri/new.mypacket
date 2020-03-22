import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';

import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {

  data: User;

  constructor(
    public apiService: ApiService,
    public router: Router,
  ) {
    this.data = new User();
  }

  ngOnInit() {
  }

  resetPass() {
    this.apiService.forgetPassword(this.data).subscribe(response => {
      this.router.navigate(['/reset_form']);
    });
  }

}
