import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/service/portfolio.service';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.css'],
})
export class ProfileHeaderComponent implements OnInit {
  portfolio: any;

  constructor(private portfolioData: PortfolioService) {}

  ngOnInit(): void {
    this.portfolioData.getData().subscribe((data) => (this.portfolio = data));
  }
}
