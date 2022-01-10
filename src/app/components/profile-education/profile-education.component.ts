import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/service/portfolio.service';
import { EducationList } from './EducationList';

@Component({
  selector: 'app-profile-education',
  templateUrl: './profile-education.component.html',
  styleUrls: ['./profile-education.component.css'],
})
export class ProfileEducationComponent implements OnInit {
  educationList: EducationList[] = [];

  constructor(private portfolioData: PortfolioService) {}

  ngOnInit(): void {
    this.portfolioData
      .getData()
      .subscribe((data) => (this.educationList = data.education));
  }
}
