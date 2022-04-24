import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { School } from 'src/app/models/school';
import { SchoolService } from 'src/app/service/school.service';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.css'],
})
export class SchoolComponent implements OnInit {
  school_logo: any = '';
  files: any = '';

  form: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    logo: ['', []],
  });

  constructor(
    private formBuilder: FormBuilder,
    private schoolService: SchoolService,
    private toastr: ToastrService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {}

  uploadPhoto(event: any) {
    this.files = event.target.files;
  }

  onSubmit(event: Event) {
    event.preventDefault;
    if (this.form.valid) {
      let { name, logo } = this.form.value;
      // Upload image to firebase
      if (logo !== '') {
        let reader = new FileReader();
        reader.readAsDataURL(this.files[0]);
        reader.onloadend = () => {
          this.storageService
            .uploadImage('schools/' + name, reader.result)
            .then((urlImage) => {
              this.school_logo = urlImage;
              const newSchool = { name, logo: this.school_logo };
              this.addSchool(newSchool);
            });
        };
      } else {
        const newSchool = { name, logo };
        this.addSchool(newSchool);
      }
      this.form.reset();
      return;
    } else {
      this.form.markAllAsTouched();
    }
  }

  /* Services */

  addSchool(newSchool: School) {
    this.schoolService.addSchool(newSchool).subscribe({
      next: (data) => {
        this.toastr.success(
          'The academic institution "' + data.name + '" has been added!',
          'Academic institution added!',
          {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          }
        );
      },
      error: (err) => {
        this.toastr.error(err.error.messageSent, 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
      },
    });
  }

  get Name() {
    return this.form.get('name');
  }

  get Logo() {
    return this.form.get('logo');
  }
}
