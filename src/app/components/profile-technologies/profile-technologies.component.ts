import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/service/portfolio.service';
import { TokenService } from 'src/app/service/token.service';
import { TechnologiesList } from './TechnologiesList';

@Component({
  selector: 'app-profile-technologies',
  templateUrl: './profile-technologies.component.html',
  styleUrls: ['./profile-technologies.component.css'],
})
export class ProfileTechnologiesComponent implements OnInit {
  technologiesList: any[] = [];
  showForm: boolean = false;
  person_id: number = 1;
  roles: string[] = [];
  isAdmin = false;

  constructor(
    private portfolioData: PortfolioService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.getTechnologies();
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

  getTechnologies() {
    this.portfolioData
      .getSection('/persons/' + this.person_id)
      .subscribe((data) => (this.technologiesList = data.technologies));
  }

  deleteItem(item: TechnologiesList) {
    this.portfolioData
      .deleteItem('technologies', item)
      .subscribe(
        () =>
          (this.technologiesList = this.technologiesList.filter(
            (list) => list.id !== item.id
          ))
      );
  }

  addTechnologie(newItem: TechnologiesList) {
    this.portfolioData
      .addItem('technologies', newItem)
      .subscribe((newItem) => this.technologiesList.push(newItem));
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }
}
