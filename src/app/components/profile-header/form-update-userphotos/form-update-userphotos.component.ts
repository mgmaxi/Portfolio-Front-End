import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Userphotos } from 'src/app/models/userphotos';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-form-update-userphotos',
  templateUrl: './form-update-userphotos.component.html',
  styleUrls: ['./form-update-userphotos.component.css'],
})
export class FormUpdateUserphotosComponent implements OnInit {
  @Output() onUpdateUserphotos: EventEmitter<Userphotos> = new EventEmitter();
  @Input() currentPersonForm: any;
  profile_photo: any = '';
  cover_photo: any = '';

  form: FormGroup = this.formBuilder.group({
    profile_photo: ['', [Validators.required]],
    cover_photo: ['', [Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.updateFormValues();
  }

  uploadPhoto(event: any, path: string) {
    let files = event.target.files;
    let reader = new FileReader();
    let user = 'mgmaxi';

    //this.storageService.uploadImage(user + '_' + Date.now(), reader.result).then((urlImage) => {console.log(urlImage);});

    reader.readAsDataURL(files[0]);
    reader.onloadend = () => {
      console.log(reader.result);
      this.storageService
        .uploadImage('users/' + user + '/' + path, reader.result)
        .then((urlImage) => {
          console.log(urlImage);
          path === 'profile'
            ? (this.profile_photo = urlImage)
            : (this.cover_photo = urlImage);
        });
    };
  }

  updateFormValues() {
    let { profile_photo, cover_photo } = this.currentPersonForm;
    this.form.patchValue({
      profile_photo: '',
      cover_photo: '',
    });
  }

  onSubmit(event: Event) {
    event.preventDefault;
    if (this.form.valid) {
      let id = this.currentPersonForm.userphotos_id;
      if (this.profile_photo != '' && this.cover_photo != '') {
        const updateUserphotos = {
          id,
          profile_photo: this.profile_photo,
          cover_photo: this.cover_photo,
        };
        this.onUpdateUserphotos.emit(updateUserphotos);
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
  get Cover_photo() {
    return this.form.get('cover_photo');
  }
}
