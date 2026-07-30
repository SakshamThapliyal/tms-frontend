import { Injectable } from '@angular/core';

import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';

import { Observable, throwError } from 'rxjs';

import { catchError } from 'rxjs/operators';

import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService,
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          case 400:
            this.showMessage('Invalid request.');
            break;

          case 401:
            this.showMessage('Session expired. Please login again.');

            this.authService.logout();
            break;

          case 403:
            this.showMessage('You are not authorized to perform this action.');
            break;

          case 404:
            this.showMessage('Requested resource not found.');
            break;

          case 500:
            this.showMessage('Internal Server Error. Please try again later.');
            break;

          default:
            this.showMessage('Something went wrong. Please try again.');
            break;
        }

        return throwError(() => error);
      }),
    );
  }

  private showMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
