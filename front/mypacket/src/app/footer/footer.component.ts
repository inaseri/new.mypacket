import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public show: boolean;

  constructor() { }

  ngOnInit() {
    // this below if use for change the menu item.
    if (localStorage.getItem('token') != null) {
      this.show = true;
    } else  {
      this.show = false;
    }
  }

}
