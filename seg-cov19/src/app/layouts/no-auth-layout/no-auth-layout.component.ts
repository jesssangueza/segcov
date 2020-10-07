import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-no-auth-layout',
  templateUrl: './no-auth-layout.component.html',
  styleUrls: ['./no-auth-layout.component.css']
})
export class NoAuthLayoutComponent implements OnInit {
  date = new Date();
  constructor() { }

  ngOnInit() {
  }

}
