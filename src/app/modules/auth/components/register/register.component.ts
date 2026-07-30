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

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  // Create Register Form
  private createForm(): void {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],

      email: ['', [Validators.required, Validators.email]],

      phone: ['', Validators.required],

      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Register User
  protected register(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();

      this.showMessage('Please fill all required fields.');

      return;
    }

    this.authService.register(this.registerForm.value).subscribe({
      next: (response: any) => {
        console.log(response);

        // Success Message
        this.showMessage('Registration successful.');

        // Navigate Login Page
        this.router.navigate(['/auth/login']);
      },

      error: (error: any) => {
        console.error(error);

        // Error Message
        this.showMessage('Registration failed.');
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
