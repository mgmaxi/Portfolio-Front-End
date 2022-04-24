import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Experience } from 'src/app/models/experience';
import { CompanyService } from 'src/app/service/company.service';
import { Company } from 'src/app/models/company';

@Component({
  selector: 'app-form-update-experience',
  templateUrl: './form-update-experience.component.html',
  styleUrls: ['./form-update-experience.component.css'],
})
export class FormUpdateExperienceComponent implements OnInit {
  @Output() onUpdateExperience: EventEmitter<Experience> = new EventEmitter();
  @Input() currentExperienceForm: any;
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
    this.updateFormValues();
  }

  onSubmit(event: Event) {
    event.preventDefault;
    if (this.form.valid) {
      let { name, company, description, start_date, end_date, is_current } =
        this.form.value;
      let id = this.currentExperienceForm.id;
      const updatedExperience = {
        id,
        name,
        company,
        description,
        start_date,
        end_date,
        is_current,
      };
      this.onUpdateExperience.emit(updatedExperience);
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

  updateFormValues() {
    let { name, description, company, start_date, end_date } =
      this.currentExperienceForm;
    let company_id = company.id;
    this.form.patchValue({
      name: name,
      description: description,
      company: company_id,
      start_date: start_date,
      end_date: end_date,
    });
  }

  /* Services */

  getCompanies() {
    this.companyService.getCompanies().subscribe({
      next: (data) => {
        this.companyList = data;
      },
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
