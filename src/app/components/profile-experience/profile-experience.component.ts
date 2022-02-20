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
  showForm: boolean = false;
  person_id: number = 1;
  roles: string[] = [];
  isAdmin = false;

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

  deleteItem(item: ExperienceList) {
    this.portfolioData
      .deleteItem('experience', item)
      .subscribe(
        () =>
          (this.experienceList = this.experienceList.filter(
            (list) => list.id !== item.id
          ))
      );
  }

  addExperience(newItem: ExperienceList) {
    this.portfolioData
      .addItem('experience', newItem)
      .subscribe((newItem) => this.experienceList.push(newItem));
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }
}
