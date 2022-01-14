import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/service/portfolio.service';

@Component({
  selector: 'app-profile-about',
  templateUrl: './profile-about.component.html',
  styleUrls: ['./profile-about.component.css'],
})
export class ProfileAboutComponent implements OnInit {
  about: string[] = [];

  constructor(private portfolioData: PortfolioService) {}

  ngOnInit(): void {
    this.portfolioData
      .getSection('header')
      .subscribe((data) => (this.about = data[0].about));
  }
}
