import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss'],
})
export class ProjectFormComponent implements OnInit {
  protected projectForm!: FormGroup;

  protected isEdit = false;

  protected projectId = 0;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');

      if (id) {
        this.isEdit = true;

        this.projectId = +id;

        this.loadProject(this.projectId);
      }
    });
  }

  // Create Form
  private createForm(): void {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],

      description: [''],

      startDate: [null, Validators.required],

      endDate: [null],
    });
  }

  // Load Project
  private loadProject(id: number): void {
    this.projectService.getProject(id).subscribe({
      next: (response) => {
        this.projectForm.patchValue({
          name: response.name,

          description: response.description,

          startDate: response.startDate ? new Date(response.startDate) : null,

          endDate: response.endDate ? new Date(response.endDate) : null,
        });
      },

      error: (error) => {
        console.error(error);

        this.showMessage('Unable to load project.');

        this.router.navigate(['/projects']);
      },
    });
  }

  // Save Project
  protected save(): void {
    if (this.projectForm.invalid) {
      this.projectForm.markAllAsTouched();

      return;
    }

    const project = this.projectForm.value;

    if (this.isEdit) {
      this.projectService
        .updateProject(this.projectId, {
          projectId: this.projectId,
          ...project,
        })
        .subscribe({
          next: () => {
            this.showMessage('Project updated successfully.');

            this.router.navigate(['/projects']);
          },

          error: (error) => {
            console.error(error);

            this.showMessage('Unable to update project.');
          },
        });
    } else {
      this.projectService.createProject(project).subscribe({
        next: () => {
          this.showMessage('Project created successfully.');

          this.router.navigate(['/projects']);
        },

        error: (error) => {
          console.error(error);

          this.showMessage('Unable to create project.');
        },
      });
    }
  }

  // Cancel
  protected cancel(): void {
    this.router.navigate(['/projects']);
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
