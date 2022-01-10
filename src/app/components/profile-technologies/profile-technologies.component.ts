import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/service/portfolio.service';
import { TechnologiesList } from './TechnologiesList';

@Component({
  selector: 'app-profile-technologies',
  templateUrl: './profile-technologies.component.html',
  styleUrls: ['./profile-technologies.component.css'],
})
export class ProfileTechnologiesComponent implements OnInit {
  technologiesList: TechnologiesList[] = [];

  constructor(private portfolioData: PortfolioService) {}

  ngOnInit(): void {
    this.portfolioData
      .getData()
      .subscribe((data) => (this.technologiesList = data.technologies));
  }
}
