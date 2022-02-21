import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { TokenService } from 'src/app/service/token.service';
import { SignupUser } from '../../models/signup-user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  form: FormGroup;
  isSignedup = false;
  isSignedupFail = false;
  signupUser: SignupUser = new SignupUser('', '', '');
  errorMsg: string = '';
  succesMsg: string = '';
  isLogged = false;

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
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    }
  }

  onSignup(event: Event) {
    event.preventDefault;
    if (this.form.valid) {
      this.signupUser = new SignupUser(
        this.form.value.username,
        this.form.value.email,
        this.form.value.password
      );

      this.authService.signup(this.signupUser).subscribe(
        (data) => {
          this.isSignedup = true;
          this.isSignedupFail = false;

          this.succesMsg = data.messageSent;
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);
        },
        (err) => {
          this.isSignedup = false;
          this.isSignedupFail = true;
          this.errorMsg = err.error;
        }
      );
    } else {
      this.form.markAllAsTouched();
    }
  }

  get Username() {
    return this.form.get('username');
  }

  get Email() {
    return this.form.get('email');
  }

  get Password() {
    return this.form.get('password');
  }
}
