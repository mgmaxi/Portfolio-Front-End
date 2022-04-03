import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginUser } from '../../models/login-user';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/security/service/auth.service';
import { TokenService } from 'src/app/security/service/token.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginUser: LoginUser = new LoginUser('', '');
  errorMsg: string = '';

  form: FormGroup = this.formBuilder.group({
    username: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(12)],
    ],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private tokenService: TokenService,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {}

  onLogin(event: Event) {
    event.preventDefault;
    if (this.form.valid) {
      this.loginUser = new LoginUser(
        this.form.value.username,
        this.form.value.password
      );

      this.authService.login(this.loginUser).subscribe(
        (data) => {
          this.tokenService.setToken(data.token);

          this.toastr.success(
            `Welcome ${this.tokenService.getUsername()}!`,
            'Successful sign in!',
            {
              timeOut: 3000,
              positionClass: 'toast-top-center',
            }
          );
          this.router.navigate(['/profile']);
        },
        (err) => {
          this.errorMsg = err.error.message;
          if (this.errorMsg === 'No value present') {
            this.errorMsg = 'Incorrect data!';
          }
          this.toastr.error(this.errorMsg, 'Sign in failed!', {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          });
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
