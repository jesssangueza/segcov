import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  public userName: string;
  @Input() isMenuOpen: boolean;
  @Output() menuSetting = new EventEmitter<boolean>();

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.userName = this.authService.getUserName();
      /*if (this.userName === 'vankrauss30') {
        window.alert("Ivan MARICA, PUTO, SOPLA NUCAS !!! ");
      }*/
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  togglePrimaryMenu() {
    // Toggle Value
    this.isMenuOpen = !this.isMenuOpen;
    // Emit the Value
    this.menuSetting.emit(this.isMenuOpen);
  }

  print() {
    window.print();
  }
}
