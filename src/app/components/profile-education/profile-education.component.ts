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
      .getSection('education')
      .subscribe((data) => (this.educationList = data));
  }

  deleteItem(item: EducationList) {
    this.portfolioData
      .deleteItem('education', item)
      .subscribe(
        () =>
          (this.educationList = this.educationList.filter(
            (list) => list.id !== item.id
          ))
      );
  }
}
