import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Company } from 'src/app/models/company';
import { Experience } from 'src/app/models/experience';
import { CompanyService } from 'src/app/service/company.service';

@Component({
  selector: 'app-form-add-experience',
  templateUrl: './form-add-experience.component.html',
  styleUrls: ['./form-add-experience.component.css'],
})
export class FormAddExperienceComponent implements OnInit {
  @Output() onAddExperience: EventEmitter<Experience> = new EventEmitter();
  companyList: Company[] = [];
  showAddCompany: boolean = false;

  form: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    description: [
      '',
      [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(250),
      ],
    ],
    company: [null, [Validators.required]],
    start_date: ['', [Validators.required]],
    end_date: ['', []],
    is_current: [false, []],
  });

  constructor(
    private formBuilder: FormBuilder,
    private companyService: CompanyService
  ) {}

  ngOnInit(): void {
    this.getCompanies();
  }

  onSubmit(event: Event) {
    event.preventDefault;
    if (this.form.valid) {
      let { name, company, description, start_date, end_date, is_current } =
        this.form.value;
      const newItem = {
        name,
        company,
        description,
        start_date,
        end_date,
        is_current,
      };
      this.onAddExperience.emit(newItem);
      this.form.reset();
      return;
    } else {
      this.form.markAllAsTouched();
    }
  }

  toggleAddCompany() {
    this.showAddCompany = !this.showAddCompany;
    this.getCompanies();
  }

  toggleIsCurrentJob() {
    if (this.form.controls['end_date'].status === 'DISABLED') {
      this.form.controls['end_date'].enable();
      return;
    } else {
      this.form.controls['end_date'].reset();
      this.form.controls['end_date'].disable();
      this.form.controls['is_current'].setValue(true);
      return;
    }
  }

  /* Services */

  getCompanies() {
    this.companyService.getCompanies().subscribe((data) => {
      this.companyList = data;
    });
  }

  get Name() {
    return this.form.get('name');
  }

  get Description() {
    return this.form.get('description');
  }

  get Company() {
    return this.form.get('company');
  }

  get Start_date() {
    return this.form.get('start_date');
  }

  get End_date() {
    return this.form.get('end_date');
  }

  get Is_current() {
    return this.form.get('is_current');
  }
}
