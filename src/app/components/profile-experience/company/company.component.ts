import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Company } from 'src/app/models/company';
import { CompanyService } from 'src/app/service/company.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
})
export class CompanyComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private companyService: CompanyService,
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
      const newCompany = { name, logo };
      this.addCompany(newCompany);
      this.form.reset();
      return;
    } else {
      this.form.markAllAsTouched();
    }
  }

  addCompany(newCompany: Company) {
    this.companyService.addCompany(newCompany).subscribe(
      (data) => {
        this.toastr.success(
          'La empresa "' + data.name + '" ha sido agregada!',
          'Empresa agregada',
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
