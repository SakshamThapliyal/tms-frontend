import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  protected registerForm!: FormGroup;
  protected isLoading = false;
  protected serverErrors: { [key: string]: string[] } = {};

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
    this.createForm();
  }

  ngOnInit(): void {}

  private createForm(): void {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', [Validators.required]],
    });
  }

  protected register(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      this.showMessage('Please fill all required fields.');
      return;
    }

    this.isLoading = true;
    this.serverErrors = {};

    this.authService.register(this.registerForm.value).subscribe({
      next: (response: any) => {
        this.showMessage('Registration successful.');
        this.router.navigate(['/auth/login']);
      },

      error: (error: any) => {
        console.error(error);

        const validationErrors = error?.error?.errors;

        if (validationErrors) {
          this.serverErrors = validationErrors;
          this.showMessage('Please fix the errors below.');
        } else {
          this.showMessage('Registration failed. Please try again.');
        }

        this.isLoading = false;
      },

      complete: () => {
        this.isLoading = false;
      },
    });
  }

  private showMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 6000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
