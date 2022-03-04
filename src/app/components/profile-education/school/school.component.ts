import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { School } from 'src/app/models/school';
import { SchoolService } from 'src/app/service/school.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.css'],
})
export class SchoolComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private schoolService: SchoolService,
    private toastr: ToastrService
  ) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      logo: ['', []],
    });
  }

  ngOnInit(): void {}

  onSubmit(event: Event) {
    event.preventDefault;
    if (this.form.valid) {
      let { name, logo } = this.form.value;
      const newSchool = { name, logo };
      this.addSchool(newSchool);
      this.form.reset();
      return;
    } else {
      this.form.markAllAsTouched();
    }
  }

  addSchool(newSchool: School) {
    this.schoolService.addSchool(newSchool).subscribe(
      (data) => {
        this.toastr.success(
          'La institución académica "' + data.name + '" ha sido agregada!',
          'Institución agregada',
          {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          }
        );
      },
      (err) => {
        this.toastr.error(err.error.message, 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
      }
    );
  }

  get Name() {
    return this.form.get('name');
  }

  get Logo() {
    return this.form.get('logo');
  }
}
