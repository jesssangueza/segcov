import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  public returnUrl = '/root';
  public errorMessage: string;
  public loginForm: FormGroup;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public async login(value) {
    try {
      const success = await this.authService.login(value.email, value.password);
      if (success) {
        this.router.navigateByUrl(this.returnUrl);
      }
      else {
        this.errorMessage = 'El usuario o contaseña es incorrecto';
      }
    } catch (ex) {
      this.errorMessage = 'El usuario o contaseña es incorrecto';
    }
  }
}
