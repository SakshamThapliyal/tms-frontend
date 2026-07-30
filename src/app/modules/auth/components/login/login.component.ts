import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  protected loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
    this.createForm();
  }

  ngOnInit(): void {}

  // Create Login Form
  private createForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],

      password: ['', Validators.required],
    });
  }

  // Login
  protected login(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();

      this.showMessage('Please enter a valid email and password.');

      return;
    }

    this.authService.login(this.loginForm.value).subscribe({
      next: (response: any) => {
        console.log(response);

        // Store JWT Token
        this.authService.setSession(response.token);

        // Success Message
        this.showMessage('Login successful.');

        // Navigate Dashboard
        this.router.navigate(['/dashboard']);
      },

      error: (error: any) => {
        console.error(error);

        // Error Message
        this.showMessage('Invalid email or password.');
      },
    });
  }

  // Show Message
  private showMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
