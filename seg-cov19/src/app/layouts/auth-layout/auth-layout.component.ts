import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.css']
})
export class AuthLayoutComponent implements OnInit {
  public menuSetting: boolean;
  public isMenuPinned: boolean;
  date = new Date();
  constructor() { }

  ngOnInit() {
  }

  onToggleMenu(menuSetting: boolean) {
    this.menuSetting = menuSetting;
  }

  onTogglePinMenu(isMenuPinned: boolean) {
    this.isMenuPinned = isMenuPinned;
  }
}
