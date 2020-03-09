import { Component, OnInit } from '@angular/core';
import { ApiService } from "../services/api.service";


@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {

    public show: boolean;

    constructor(
      public apiService: ApiService
    ) { }


  ngOnInit() {
    // this below if use for change the menu item.
    if (localStorage.getItem('token') != null) {
      this.show = true;
    } else  {
      this.show = false;
    }
  }

  onlogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    localStorage.clear();
    this.apiService.isUserLoggedIn = false;
    // reload page after logout
    window.location.assign('/');
  }
}
