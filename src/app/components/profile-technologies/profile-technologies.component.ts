import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/service/portfolio.service';
import { TechnologiesList } from './TechnologiesList';

@Component({
  selector: 'app-profile-technologies',
  templateUrl: './profile-technologies.component.html',
  styleUrls: ['./profile-technologies.component.css'],
})
export class ProfileTechnologiesComponent implements OnInit {
  technologiesList: any[] = [];
  showForm: boolean = false;
  person_id: number = 1;

  constructor(private portfolioData: PortfolioService) {}

  ngOnInit(): void {
    this.portfolioData
      .getSection('/persons/' + this.person_id)
      .subscribe((data) => (this.technologiesList = data.technologies));
  }

  deleteItem(item: TechnologiesList) {
    this.portfolioData
      .deleteItem('technologies', item)
      .subscribe(
        () =>
          (this.technologiesList = this.technologiesList.filter(
            (list) => list.id !== item.id
          ))
      );
  }

  addTechnologie(newItem: TechnologiesList) {
    this.portfolioData
      .addItem('technologies', newItem)
      .subscribe((newItem) => this.technologiesList.push(newItem));
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }
}
