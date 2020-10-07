import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Input() isMenuOpen: boolean;
  @Output() menuSetting = new EventEmitter<boolean>();
  @Output() menuPinned = new EventEmitter<boolean>();

  public isMenuPinned = false;

  constructor() { }

  ngOnInit() {
  }

  toggleOpenMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.menuSetting.emit(this.isMenuOpen);
  }

  togglePinMenu(){
    this.isMenuPinned = !this.isMenuPinned;
    this.menuPinned.emit(this.isMenuPinned);
  }
}
