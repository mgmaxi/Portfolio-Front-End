import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Education } from 'src/app/models/education';
import { School } from 'src/app/models/school';
import { SchoolService } from 'src/app/service/school.service';

@Component({
  selector: 'app-form-update-education',
  templateUrl: './form-update-education.component.html',
  styleUrls: ['./form-update-education.component.css'],
})
export class FormUpdateEducationComponent implements OnInit {
  @Output() onUpdateEducation: EventEmitter<Education> = new EventEmitter();
  @Input() currentEducationForm: any;
  schoolList: School[] = [];
  showAddSchool: boolean = false;

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
    school: [null, [Validators.required]],
    start_date: ['', [Validators.required]],
    end_date: ['', []],
  });

  constructor(
    private formBuilder: FormBuilder,
    private schoolService: SchoolService
  ) {}

  ngOnInit(): void {
    this.getSchools();
    this.updateFormValues();
  }

  updateFormValues() {
    let { name, description, school, start_date, end_date } =
      this.currentEducationForm;
    let school_id = school.id;
    this.form.patchValue({
      name: name,
      description: description,
      school: school_id,
      start_date: start_date,
      end_date: end_date,
    });
  }

  getSchools() {
    this.schoolService.getSchools().subscribe((data) => {
      this.schoolList = data;
    });
  }

  onSubmit(event: Event) {
    event.preventDefault;
    if (this.form.valid) {
      let { name, school, description, start_date, end_date } = this.form.value;
      let id = this.currentEducationForm.id;
      const updatedEducation = {
        id,
        name,
        school,
        description,
        start_date,
        end_date,
      };
      this.onUpdateEducation.emit(updatedEducation);
      this.form.reset();
      return;
    } else {
      this.form.markAllAsTouched();
    }
  }

  toggleAddSchool() {
    this.showAddSchool = !this.showAddSchool;
    this.getSchools();
  }

  get Name() {
    return this.form.get('name');
  }

  get School() {
    return this.form.get('school');
  }

  get Description() {
    return this.form.get('description');
  }

  get Start_date() {
    return this.form.get('start_date');
  }

  get End_date() {
    return this.form.get('end_date');
  }
}
