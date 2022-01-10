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

  constructor(private portfolioData: PortfolioService) {}

  ngOnInit(): void {
    this.portfolioData
      .getData()
      .subscribe((data) => (this.languagesList = data.languages));
  }
}
