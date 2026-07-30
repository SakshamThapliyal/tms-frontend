import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';

import { Dashboard } from '../../models/dashboard';
import { DashboardService } from '../../services/dashboard.service';

import { Project } from 'src/app/modules/project/models/project';
import { ProjectService } from 'src/app/modules/project/services/project.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  // Dashboard Data
  protected dashboard?: Dashboard;

  // Projects
  protected projects: Project[] = [];

  // Reactive Form
  protected dashboardForm!: FormGroup;

  // Calendar
  protected selectedDate = new Date();

  protected today = new Date();

  constructor(
    private fb: FormBuilder,
    private dashboardService: DashboardService,
    private projectService: ProjectService,
  ) {}

  ngOnInit(): void {
    this.createForm();

    this.loadProjects();

    this.dashboardForm.get('projectId')?.valueChanges.subscribe((projectId) => {
      if (projectId) {
        this.loadDashboard(projectId);
      }
    });
  }

  // Create Form
  private createForm(): void {
    this.dashboardForm = this.fb.group({
      projectId: [null],
    });
  }

  // Load Projects
  private loadProjects(): void {
    this.projectService
      .getProjects({
        pageIndex: 0,
        pageSize: 100,
        search: '',
      })
      .subscribe({
        next: (response) => {
          this.projects = response.items;

          if (this.projects.length > 0) {
            this.dashboardForm.patchValue({
              projectId: this.projects[0].projectId,
            });
          }
        },

        error: (error) => {
          console.error(error);
        },
      });
  }

  // Load Dashboard
  private loadDashboard(projectId: number): void {
    this.dashboardService.getDashboard(projectId).subscribe({
      next: (response) => {
        this.dashboard = response;
      },

      error: (error) => {
        console.error(error);
      },
    });
  }

  // Calendar
  protected onDateSelected(date: Date): void {
    this.selectedDate = date;
  }
}
