import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/service/portfolio.service';

@Component({
  selector: 'app-profile-experience',
  templateUrl: './profile-experience.component.html',
  styleUrls: ['./profile-experience.component.css'],
})
export class ProfileExperienceComponent implements OnInit {
  experienceList: any;

  constructor(private portolioData: PortfolioService) {}

  ngOnInit(): void {
    this.portolioData
      .getData()
      .subscribe((data) => (this.experienceList = data.experience));
  }
}
