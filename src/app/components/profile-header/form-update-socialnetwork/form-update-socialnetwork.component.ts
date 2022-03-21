import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Socialnetwork } from 'src/app/models/socialnetwork';

@Component({
  selector: 'app-form-update-socialnetwork',
  templateUrl: './form-update-socialnetwork.component.html',
  styleUrls: ['./form-update-socialnetwork.component.css'],
})
export class FormUpdateSocialnetworkComponent implements OnInit {
  @Output() onUpdateSocialnetwork: EventEmitter<Socialnetwork> =
    new EventEmitter();
  @Input() currentSocialnetworkForm: any;

  form: FormGroup = this.formBuilder.group({
    linkedin: ['', []],
    github: ['', []],
    youtube: ['', []],
  });

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.updateFormValues();
  }

  updateFormValues() {
    let { linkedin, github, youtube } = this.currentSocialnetworkForm;
    this.form.patchValue({
      linkedin: linkedin,
      github: github,
      youtube: youtube,
    });
  }

  onSubmit(event: Event) {
    event.preventDefault;
    if (this.form.valid) {
      let { linkedin, github, youtube } = this.form.value;
      let id = this.currentSocialnetworkForm.id;
      const updateSocialnetwork = { id, linkedin, github, youtube };
      this.onUpdateSocialnetwork.emit(updateSocialnetwork);
      this.form.reset();
      return;
    } else {
      this.form.markAllAsTouched();
    }
  }

  get Linkedin() {
    return this.form.get('linkedin');
  }
  get Github() {
    return this.form.get('github');
  }
  get Youtube() {
    return this.form.get('youtube');
  }
}
