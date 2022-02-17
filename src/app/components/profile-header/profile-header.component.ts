import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/service/portfolio.service';
import { Header } from './Header';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.css'],
})
export class ProfileHeaderComponent implements OnInit {
  header: any;
  person_id: any = 1;
  cover_photo: string = '../../../assets/image/profile/profileCover.jpg';
  profile_photo: string = '../../../assets/image/profile/profileCover.jpg';

  constructor(private portfolioData: PortfolioService) {}

  ngOnInit(): void {
    this.portfolioData
      .getSection('/persons/' + this.person_id + '/profile')
      .subscribe((data) => (this.header = data));
  }
}
