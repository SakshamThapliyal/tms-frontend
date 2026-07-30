import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PaginationRequest } from 'src/app/core/models/pagination-request';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent implements OnInit {
  // Table Columns
  protected displayedColumns: string[] = [
    // 'projectId',
    'actions',
    'name',
    'description',
    'startDate',
    'endDate',
  ];

  // Data Source
  protected projects: Project[] = [];

  // Reactive Filter Form
  protected filterForm: FormGroup = this.fb.group({
    search: [''],
  });

  // Pagination
  protected paginationRequest: PaginationRequest = {
    pageIndex: 0,
    pageSize: 5,
    search: '',
  };

  protected totalRecords = 0;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  // Load Projects
  protected loadProjects(): void {
    // Sync filter values from the reactive form into the pagination request
    this.paginationRequest.search = this.filterForm.value.search;

    this.projectService.getProjects(this.paginationRequest).subscribe({
      next: (response) => {
        console.log(response);
        this.projects = response.items;
        this.totalRecords = response.totalRecords;
      },

      error: (error) => {
        console.error(error);
        this.showMessage('Unable to load projects.');
      },
    });
  }

  // Delete Project
  protected deleteProject(projectId: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',

      disableClose: true,

      data: {
        title: 'Delete Project',

        message: 'Are you sure you want to delete this project?',

        confirmText: 'Delete',

        cancelText: 'Cancel',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }

      this.projectService.deleteProject(projectId).subscribe({
        next: () => {
          this.showMessage('Project deleted successfully.');

          this.loadProjects();
        },

        error: (error) => {
          console.error(error);
          // comment on this because we create the error interceptor
          // this.showMessage('Unable to delete project.');
        },
      });
    });
  }

  // Page Change
  protected onPageChange(event: PageEvent): void {
    this.paginationRequest.pageIndex = event.pageIndex;

    this.paginationRequest.pageSize = event.pageSize;

    this.loadProjects();
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
