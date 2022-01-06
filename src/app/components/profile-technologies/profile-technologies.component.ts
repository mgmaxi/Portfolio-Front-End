import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/service/portfolio.service';

@Component({
  selector: 'app-profile-technologies',
  templateUrl: './profile-technologies.component.html',
  styleUrls: ['./profile-technologies.component.css'],
})
export class ProfileTechnologiesComponent implements OnInit {
  technologiesList: any;

  constructor(private portfolioData: PortfolioService) {}

  ngOnInit(): void {
    this.portfolioData
      .getData()
      .subscribe((data) => (this.technologiesList = data.technologies));
  }
}
