import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Company } from 'src/app/models/company';
import { CompanyService } from 'src/app/service/company.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
})
export class CompanyComponent implements OnInit {
  company_logo: any = '';
  files: any = '';

  form: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    logo: ['', []],
  });

  constructor(
    private formBuilder: FormBuilder,
    private companyService: CompanyService,
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
            .uploadImage('companies/' + name, reader.result)
            .then((urlImage) => {
              this.company_logo = urlImage;
              const newCompany = { name, logo: this.company_logo };
              this.addCompany(newCompany);
            });
        };
      } else {
        const newCompany = { name, logo };
        this.addCompany(newCompany);
      }

      this.form.reset();
      return;
    } else {
      this.form.markAllAsTouched();
    }
  }

  /* Services */

  addCompany(newCompany: Company) {
    this.companyService.addCompany(newCompany).subscribe({
      next: (data) => {
        this.toastr.success(
          'The company  "' + data.name + '" has been added.',
          'Company added!',
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
