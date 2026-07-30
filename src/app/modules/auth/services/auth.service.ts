import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Router } from '@angular/router';

import { jwtDecode } from 'jwt-decode';

import { environment } from '../../../../environments/environment';

import { MatSnackBar } from '@angular/material/snack-bar';

import { TokenPayload } from '../models/token-payload';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private appUrl = environment.apiBaseUrl;

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  // Login
  login(data: any): Observable<any> {
    return this.http.post(`${this.appUrl}/Auth/Login`, data);
  }

  // Register
  register(data: any): Observable<any> {
    return this.http.post(`${this.appUrl}/Auth/Register`, data);
  }

  // Store JWT Token
  setSession(token: string): void {
    localStorage.setItem('token', token);
  }

  // Get JWT Token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Decode JWT Token
  getCurrentUser(): TokenPayload | null {
    const token = this.getToken();

    if (!token) {
      return null;
    }

    try {
      const decoded: any = jwtDecode(token);

      return {
        userId: Number(decoded['UserId']),

        fullName:
          decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],

        email:
          decoded[
            'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
          ],

        role: decoded[
          'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
        ],

        exp: decoded.exp,

        iss: decoded.iss,

        aud: decoded.aud,
      };
    } catch {
      return null;
    }
  }

  // Check Login
  isLoggedIn(): boolean {
    const user = this.getCurrentUser();

    if (!user) {
      return false;
    }

    return user.exp * 1000 > Date.now();
  }

  // Logout
  logout(): void {
    localStorage.removeItem('token');

    this.showMessage('Logout successful.');

    this.router.navigate(['/auth/login']);
  }

  // Get Current User Role
  getRole(): string | null {
    return this.getCurrentUser()?.role ?? null;
  }

  // Check Admin
  isAdmin(): boolean {
    return this.getRole() === 'Admin';
  }

  // Check Normal User
  isUser(): boolean {
    return this.getRole() === 'User';
  }

  // Show Snackbar
  private showMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
