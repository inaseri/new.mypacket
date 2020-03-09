import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';

import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  data: User;

  constructor(
    public apiService: ApiService,
    public router: Router,
  ) {
    this.data = new User();
  }

  ngOnInit() {
  }

  registerForm() {
    this.apiService.register(this.data).subscribe(response => {
      this.router.navigate(['']);
    });
  }
}
