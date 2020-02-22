import { Component, OnInit } from '@angular/core';
import {User} from '../models/user';

import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {

  data: User;

  constructor(
    public apiService: ApiService,
    public router: Router,
  ) {
    this.data = new User();
  }

  ngOnInit() {
  }

  loginForm() {
    this.apiService.login(this.data).subscribe(response => {
      this.router.navigate(['/report']);

      // this two lines use for get response from api.
      this.apiService.token = response.token;
      this.apiService.user = (response.id.toString());

      // this two below lines use for save user id and token in to local storage.
      localStorage.setItem('token', response.token);
      localStorage.setItem('user_id', response.id.toString());

      // this line use for reload after login.
      window.location.assign('/report');

    });
  }
}
