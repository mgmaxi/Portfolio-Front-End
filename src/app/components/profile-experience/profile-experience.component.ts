import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/service/portfolio.service';
import { TokenService } from 'src/app/service/token.service';
import { ExperienceList } from './ExperienceList';

@Component({
  selector: 'app-profile-experience',
  templateUrl: './profile-experience.component.html',
  styleUrls: ['./profile-experience.component.css'],
})
export class ProfileExperienceComponent implements OnInit {
  experienceList: any[] = [];
  showAddForm: boolean = false;
  showUpdateForm: boolean = false;
  person_id: any = 1;
  roles: string[] = [];
  isAdmin = false;

  currentExperience: any;

  constructor(
    private portfolioData: PortfolioService,
    private tokenService: TokenService
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
    this.portfolioData
      .getSection('/experiences/persons/' + this.person_id)
      .subscribe((data) => (this.experienceList = data));
  }

  addExperience(newItem: ExperienceList) {
    let { name, company, description, start_date, end_date } = newItem;
    const newExperience = { name, description, start_date, end_date };
    let company_id: any = company;
    this.portfolioData
      .addItemMultipleParameters(
        'experiences',
        'persons',
        this.person_id,
        'companies',
        company_id,
        newExperience
      )
      .subscribe((newExperience) => this.experienceList.push(newExperience));
    this.toggleAddForm();
  }

  updateExperience(updatedExperience: any) {
    let { id, name, company, description, start_date, end_date } =
      updatedExperience;
    let experience_id = id;
    let company_id = company;
    const newExperience = { name, description, start_date, end_date };

    this.portfolioData
      .updateItemMultipleParameters(
        'experiences',
        experience_id,
        'persons',
        this.person_id,
        'companies',
        company_id,
        newExperience
      )
      .subscribe((newExperience) => this.experienceList.push(newExperience));
    this.toggleUpdateForm();
  }

  deleteItem(item: ExperienceList) {
    console.log(item);
    let experience_id: any = item.id;
    this.portfolioData
      .deleteItemMultipleParameters(
        'experiences',
        experience_id,
        'persons',
        this.person_id
      )
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
