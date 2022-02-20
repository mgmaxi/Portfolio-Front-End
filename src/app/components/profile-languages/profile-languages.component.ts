import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/service/portfolio.service';
import { TokenService } from 'src/app/service/token.service';
import { LanguagesList } from './LanguagesList';

@Component({
  selector: 'app-profile-languages',
  templateUrl: './profile-languages.component.html',
  styleUrls: ['./profile-languages.component.css'],
})
export class ProfileLanguagesComponent implements OnInit {
  languagesList: any[] = [];
  showForm: boolean = false;
  person_id: number = 1;
  roles: string[] = [];
  isAdmin = false;

  constructor(
    private portfolioData: PortfolioService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.getLanguages();
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

  getLanguages() {
    this.portfolioData
      .getSection('/persons/' + this.person_id)
      .subscribe((data) => (this.languagesList = data.languages));
  }

  deleteItem(item: LanguagesList) {
    this.portfolioData
      .deleteItem('languages', item)
      .subscribe(
        () =>
          (this.languagesList = this.languagesList.filter(
            (list) => list.id !== item.id
          ))
      );
  }

  addLanguage(newItem: LanguagesList) {
    this.portfolioData
      .addItem('languages', newItem)
      .subscribe((newItem) => this.languagesList.push(newItem));
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }
}
