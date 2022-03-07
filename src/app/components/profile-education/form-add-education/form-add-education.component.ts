import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { School } from 'src/app/models/school';
import { SchoolService } from 'src/app/service/school.service';

@Component({
  selector: 'app-form-add-education',
  templateUrl: './form-add-education.component.html',
  styleUrls: ['./form-add-education.component.css'],
})
export class FormAddEducationComponent implements OnInit {
  @Output() onAddEducation: EventEmitter<any> = new EventEmitter();
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
    end_date: ['', [Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private schoolService: SchoolService
  ) {}

  ngOnInit(): void {
    this.getSchools();
  }

  getSchools() {
    this.schoolService.getSchools().subscribe((data) => {
      this.schoolList = data;
    });
  }

  onSubmit(event: Event) {
    event.preventDefault;
    if (this.form.valid) {
      let { name, description, start_date, end_date, school } = this.form.value;
      const newEducation = { name, description, start_date, end_date, school };
      this.onAddEducation.emit(newEducation);
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

  get Description() {
    return this.form.get('description');
  }

  get School() {
    return this.form.get('school');
  }

  get Start_date() {
    return this.form.get('start_date');
  }

  get End_date() {
    return this.form.get('end_date');
  }
}
