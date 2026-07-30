import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/modules/auth/services/auth.service';

import { TokenPayload } from 'src/app/modules/auth/models/token-payload';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  currentUser: TokenPayload | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadCurrentUser();
  }

  // Load Logged-in User
  private loadCurrentUser(): void {
    this.currentUser = this.authService.getCurrentUser();
  }

  // Logout
  logout(): void {
    this.authService.logout();
  }
}
