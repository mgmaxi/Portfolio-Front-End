import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/security/service/auth.service';
import { SignupUser } from '../../models/signup-user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupUser: SignupUser = new SignupUser('', '', '', '', '');
  errorMsg: string = '';

  form: FormGroup = this.formBuilder.group({
    username: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(12)],
    ],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    first_name: ['', [Validators.required, Validators.minLength(3)]],
    last_name: ['', [Validators.required, Validators.minLength(3)]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {}

  onSignup(event: Event) {
    event.preventDefault;
    if (this.form.valid) {
      this.signupUser = new SignupUser(
        this.form.value.username,
        this.form.value.email,
        this.form.value.password,
        this.form.value.first_name,
        this.form.value.last_name
      );

      this.authService.signup(this.signupUser).subscribe({
        next: (data) => {
          this.toastr.success(
            'The account has been created.',
            'Successful sign up!',
            {
              timeOut: 3000,
              positionClass: 'toast-top-center',
            }
          );
          this.router.navigate(['/signin']);
        },
        error: (err) => {
          this.errorMsg = err.error.messageSent;
          this.toastr.error(this.errorMsg, 'Sign up failed!', {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          });
        },
      });
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

  get First_name() {
    return this.form.get('first_name');
  }
  get Last_name() {
    return this.form.get('last_name');
  }
}
