import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/service/portfolio.service';
import { LanguagesList } from './LanguagesList';

@Component({
  selector: 'app-profile-languages',
  templateUrl: './profile-languages.component.html',
  styleUrls: ['./profile-languages.component.css'],
})
export class ProfileLanguagesComponent implements OnInit {
  languagesList: LanguagesList[] = [];
  showForm: boolean = false;

  constructor(private portfolioData: PortfolioService) {}

  ngOnInit(): void {
    this.portfolioData
      .getSection('languages')
      .subscribe((data) => (this.languagesList = data));
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
