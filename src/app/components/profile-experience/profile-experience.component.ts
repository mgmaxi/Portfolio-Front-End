import { Component, OnInit } from '@angular/core';
import { Experience } from 'src/app/models/experience';
import { ExperienceService } from 'src/app/service/experience.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-profile-experience',
  templateUrl: './profile-experience.component.html',
  styleUrls: ['./profile-experience.component.css'],
})
export class ProfileExperienceComponent implements OnInit {
  experienceList: Experience[] = [];
  roles: string[] = [];
  person_id: number = 1;
  isAdmin = false;
  showAddForm: boolean = false;
  showUpdateForm: boolean = false;
  currentExperience: any;

  constructor(
    private tokenService: TokenService,
    private experienceService: ExperienceService
  ) {}

  ngOnInit(): void {
    this.getExperiences();
    this.getRoles();
  }

  getRoles() {
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach((role) => {
      if (role === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });
  }

  getExperiences() {
    this.experienceService
      .getExperiences(this.person_id)
      .subscribe((data) => (this.experienceList = data));
  }

  addExperience(experience: Experience) {
    let { name, company, description, start_date, end_date } = experience;
    const newExperience = { name, description, start_date, end_date };
    let company_id = company;
    this.experienceService
      .addExperience(this.person_id, company_id, newExperience)
      .subscribe((newExperience) => this.experienceList.push(newExperience));
    this.toggleAddForm();
  }

  updateExperience(experience: Experience) {
    let { id, name, company, description, start_date, end_date } = experience;
    let experience_id = id;
    let company_id = company;
    const updatedExperience = { name, description, start_date, end_date };
    this.experienceService
      .updateExperience(
        experience_id!,
        this.person_id,
        company_id,
        updatedExperience
      )
      .subscribe((updatedExperience) =>
        this.experienceList.push(updatedExperience)
      );
    this.toggleUpdateForm();
  }

  deleteItem(experience: Experience) {
    let experience_id = experience.id;
    this.experienceService
      .deleteExperience(experience_id!, this.person_id)
      .subscribe(
        () =>
          (this.experienceList = this.experienceList.filter(
            (list) => list.id !== experience_id
          ))
      );
  }

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
  }

  toggleUpdateForm(experience?: any) {
    this.showUpdateForm = !this.showUpdateForm;
    this.currentExperience = experience;
    console.log(this.currentExperience);
  }
}
