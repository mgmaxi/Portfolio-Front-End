import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginUser } from '../../models/login-user';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isLogged = false;
  isLoginFail = false;
  loginUser: LoginUser = new LoginUser('', '');
  roles: string[] = [];
  errorMsg: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(12),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }

  onSubmit(event: Event) {
    event.preventDefault;
    if (this.form.valid) {
      this.loginUser = new LoginUser(
        this.form.value.username,
        this.form.value.password
      );

      this.authService.login(this.loginUser).subscribe(
        (data) => {
          this.isLogged = true;
          this.isLoginFail = false;

          this.tokenService.setToken(data.token);
          this.tokenService.setUsername(data.username);
          this.tokenService.setAuthorities(data.authorities);
          this.roles = data.authorities;
          this.router.navigate(['/portfolio']);
        },
        (err) => {
          this.isLogged = false;
          this.isLoginFail = true;
          this.errorMsg = err.error.message;
        }
      );
    } else {
      this.form.markAllAsTouched();
    }
  }

  get Username() {
    return this.form.get('username');
  }

  get Password() {
    return this.form.get('password');
  }
}
