import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/security/service/token.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  isLogged = false;
  username: string = '';

  constructor(private tokenService: TokenService) {}

  ngOnInit(): void {
    this.isLogged = this.tokenService.isLogged();
    this.getUsername();
  }

  onLogOut(): void {
    this.tokenService.logOut();
  }

  getUsername() {
    let username = this.tokenService.getUsername();
    if (username === null) {
      this.username = 'mgmaxi';
    } else {
      this.username = username;
    }
  }
}
