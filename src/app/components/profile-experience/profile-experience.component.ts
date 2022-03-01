import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Experience } from 'src/app/models/experience';
import { ExperienceService } from 'src/app/service/experience.service';
import { SectionsService } from 'src/app/service/sections.service';
import { TokenService } from 'src/app/security/service/token.service';

@Component({
  selector: 'app-profile-experience',
  templateUrl: './profile-experience.component.html',
  styleUrls: ['./profile-experience.component.css'],
})
export class ProfileExperienceComponent implements OnInit {
  experienceList: Experience[] = [];
  person_id: number = 1;
  isAdmin = false;
  showAddForm: boolean = false;
  showUpdateForm: boolean = false;
  currentExperience: any;
  showExperienceSection: boolean = true;

  constructor(
    private tokenService: TokenService,
    private experienceService: ExperienceService,
    private sectionsService: SectionsService,

    private router: Router
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.tokenService.isAdmin();
    this.getExperiences();
    this.showExperience();
  }

  getExperiences() {
    this.experienceService.getExperiences(this.person_id).subscribe((data) => {
      this.experienceList = data;
      if (this.experienceList.length === 0) {
        this.showExperienceSection = false;
      }
    });
  }

  addExperience(experience: Experience) {
    let {
      name,
      company: company_id,
      description,
      start_date,
      end_date,
    } = experience;
    const newExperience = { name, description, start_date, end_date };
    this.experienceService
      .addExperience(this.person_id, company_id, newExperience)
      .subscribe((newExperience) => this.experienceList.push(newExperience));
    this.toggleAddForm();
  }

  updateExperience(experience: Experience) {
    let {
      id: experience_id,
      name,
      company: company_id,
      description,
      start_date,
      end_date,
    } = experience;
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
    this.refreshComponent();
  }

  deleteExperience(experience: Experience) {
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

  deleteAllExperiencesFromPerson() {
    this.experienceService
      .deleteAllExperiencesFromPerson(this.person_id)
      .subscribe(() => {
        this.experienceList = [];
        this.refreshComponent();
      });
  }

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
  }

  toggleUpdateForm(experience?: Experience) {
    this.showUpdateForm = !this.showUpdateForm;
    this.currentExperience = experience;
  }

  refreshComponent() {
    this.router
      .navigateByUrl('/RefreshComponent', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['portfolio']);
      });
  }

  showExperience() {
    this.sectionsService.showExperienceSection.subscribe((data) => {
      this.showExperienceSection = data;
    });
  }
}
