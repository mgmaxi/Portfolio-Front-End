import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/service/portfolio.service';
import { ProjectsList } from './ProjectsList';

@Component({
  selector: 'app-profile-projects',
  templateUrl: './profile-projects.component.html',
  styleUrls: ['./profile-projects.component.css'],
})
export class ProfileProjectsComponent implements OnInit {
  projectList: ProjectsList[] = [];
  showForm: boolean = false;

  constructor(private portfolioData: PortfolioService) {}

  ngOnInit(): void {
    this.portfolioData
      .getSection('projects')
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
