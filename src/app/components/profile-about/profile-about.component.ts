import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/service/portfolio.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-profile-about',
  templateUrl: './profile-about.component.html',
  styleUrls: ['./profile-about.component.css'],
})
export class ProfileAboutComponent implements OnInit {
  about: string[] = [];
  person_id: number = 1;
  roles: string[] = [];
  isAdmin = false;

  constructor(
    private portfolioData: PortfolioService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.getAbout();
  }

  getRoles() {
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach((role) => {
      if (role === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });
  }

  getAbout() {
    this.portfolioData
      .getSection('/persons/' + this.person_id)
      .subscribe((data) => (this.about = data.about));
  }
}
