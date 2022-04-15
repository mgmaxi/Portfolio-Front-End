import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Userphotos } from 'src/app/models/userphotos';
import { StorageService } from 'src/app/service/storage.service';
import { TokenService } from 'src/app/security/service/token.service';

@Component({
  selector: 'app-form-update-profilephotos',
  templateUrl: './form-update-profilephotos.component.html',
  styleUrls: ['./form-update-profilephotos.component.css'],
})
export class FormUpdateProfilephotosComponent implements OnInit {
  @Output() onUpdateProfilephotos: EventEmitter<Userphotos> =
    new EventEmitter();
  @Input() currentPersonForm: any;
  profile_photo: any = '';
  username: string = '';

  form: FormGroup = this.formBuilder.group({
    profile_photo: ['', [Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.getUsername();
  }

  getUsername() {
    this.username = this.tokenService.getUsername();
  }

  uploadPhoto(event: any) {
    let files = event.target.files;
    let reader = new FileReader();

    reader.readAsDataURL(files[0]);
    reader.onloadend = () => {
      this.storageService
        .uploadImage('users/' + this.username + '/profile', reader.result)
        .then((urlImage) => {
          this.profile_photo = urlImage;
        });
    };
  }

  onSubmit(event: Event) {
    event.preventDefault;
    if (this.form.valid) {
      let id = this.currentPersonForm.userphotos_id;
      if (this.profile_photo != '') {
        const updateProfilephotos = {
          id,
          profile_photo: this.profile_photo,
        };
        this.onUpdateProfilephotos.emit(updateProfilephotos);
        this.form.reset();
        return;
      }
    } else {
      this.form.markAllAsTouched();
    }
  }

  get Profile_photo() {
    return this.form.get('profile_photo');
  }
}
