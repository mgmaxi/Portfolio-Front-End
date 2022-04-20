import { Component } from '@angular/core';
declare let AOS: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-Portfolio';
  ngOnInit(): void {
    AOS.init({
      duration: 1000,
    });
  }
}
