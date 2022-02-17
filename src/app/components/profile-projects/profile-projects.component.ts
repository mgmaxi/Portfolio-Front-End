import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/service/portfolio.service';
import { ProjectsList } from './ProjectsList';

@Component({
  selector: 'app-profile-projects',
  templateUrl: './profile-projects.component.html',
  styleUrls: ['./profile-projects.component.css'],
})
export class ProfileProjectsComponent implements OnInit {
  projectList: any[] = [];
  showForm: boolean = false;
  person_id: number = 1;

  constructor(private portfolioData: PortfolioService) {}

  ngOnInit(): void {
    this.portfolioData
      .getSection('/projects/persons/' + this.person_id)
      .subscribe((data) => (this.projectList = data));
  }

  deleteItem(item: ProjectsList) {
    this.portfolioData
      .deleteItem('projects', item)
      .subscribe(
        () =>
          (this.projectList = this.projectList.filter(
            (list) => list.id !== item.id
          ))
      );
  }

  addProject(newItem: ProjectsList) {
    this.portfolioData
      .addItem('projects', newItem)
      .subscribe((newItem) => this.projectList.push(newItem));
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }
}
