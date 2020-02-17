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
    public router: Router
  ) {
    this.data = new User();
  }

  ngOnInit() {
  }

  loginForm() {
    this.apiService.login(this.data).subscribe((response) => {
      this.router.navigate(['/']);
    });

  }
}
