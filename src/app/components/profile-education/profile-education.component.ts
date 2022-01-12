import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/service/portfolio.service';
import { EducationList } from './EducationList';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-profile-education',
  templateUrl: './profile-education.component.html',
  styleUrls: ['./profile-education.component.css'],
})
export class ProfileEducationComponent implements OnInit {
  educationList: EducationList[] = [];
  showForm: boolean = false;

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

  addEducation(newItem: EducationList) {
    this.portfolioData
      .addItem('education', newItem)
      .subscribe((newItem) => this.educationList.push(newItem));
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  onDropped(event: CdkDragDrop<any>) {
    const previous = event.previousIndex;
    const current = event.currentIndex;
    moveItemInArray(this.educationList, previous, current);
  }
}
