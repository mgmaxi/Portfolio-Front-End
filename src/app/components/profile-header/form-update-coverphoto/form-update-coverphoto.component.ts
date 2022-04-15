import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from 'src/app/service/storage.service';
import { Userphotos } from 'src/app/models/userphotos';
import { TokenService } from 'src/app/security/service/token.service';

@Component({
  selector: 'app-form-update-coverphoto',
  templateUrl: './form-update-coverphoto.component.html',
  styleUrls: ['./form-update-coverphoto.component.css'],
})
export class FormUpdateCoverphotoComponent implements OnInit {
  @Output() onUpdateCoverphotos: EventEmitter<Userphotos> = new EventEmitter();
  @Input() currentPersonForm: any;
  cover_photo: any = '';
  username: string = '';

  form: FormGroup = this.formBuilder.group({
    cover_photo: ['', [Validators.required]],
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
        .uploadImage('users/' + this.username + '/cover', reader.result)
        .then((urlImage) => {
          this.cover_photo = urlImage;
        });
    };
  }

  onSubmit(event: Event) {
    event.preventDefault;
    if (this.form.valid) {
      let id = this.currentPersonForm.userphotos_id;
      if (this.cover_photo != '') {
        const updateCoverphotos = {
          id,
          cover_photo: this.cover_photo,
        };
        this.onUpdateCoverphotos.emit(updateCoverphotos);
        this.form.reset();
        return;
      }
    } else {
      this.form.markAllAsTouched();
    }
  }

  get Cover_photo() {
    return this.form.get('cover_photo');
  }
}
