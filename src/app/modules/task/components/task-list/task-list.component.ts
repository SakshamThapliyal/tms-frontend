import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';

import { MatDialog } from '@angular/material/dialog';

import { MatSnackBar } from '@angular/material/snack-bar';

import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';

import { Project } from 'src/app/modules/project/models/project';
import { ProjectService } from 'src/app/modules/project/services/project.service';

import { User } from 'src/app/modules/user/models/user';
import { UserService } from 'src/app/modules/user/services/user.service';

import { TaskSummary } from '../../models/task-summary';
import { TaskPaginationRequest } from '../../models/task-pagination-request';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  // Table Columns
  protected displayedColumns: string[] = [
    // 'taskId',
    'actions',
    'taskTitle',
    'status',
    'priority',
    'projectName',
    'assigneeName',
    'dueDate',
  ];

  // Data Source
  protected tasks: TaskSummary[] = [];

  // Project Filter
  protected projects: Project[] = [];

  // User Filter
  protected users: User[] = [];

  // Reactive Filter Form
  protected filterForm: FormGroup = this.fb.group({
    search: [''],
    status: [''],
    projectId: [''],
    assignedToUserId: [''],
  });

  // Pagination + Filters
  protected paginationRequest: TaskPaginationRequest = {
    pageIndex: 0,
    pageSize: 5,
    search: '',
    status: '',
    projectId: undefined,
    assignedToUserId: undefined,
  };

  protected totalRecords = 0;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private projectService: ProjectService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.loadProjects();
    this.loadUsers();
    this.loadTasks();
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
        },

        error: (error) => {
          console.error(error);
        },
      });
  }

  // Load Users
  private loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (response) => {
        this.users = response;
      },

      error: (error) => {
        console.error(error);
      },
    });
  }

  // Load Tasks
  protected loadTasks(): void {
    // Sync filter values from the reactive form into the pagination request
    const { search, status, projectId, assignedToUserId } =
      this.filterForm.value;

    this.paginationRequest.search = search;
    this.paginationRequest.status = status;
    this.paginationRequest.projectId = projectId === '' ? undefined : projectId;
    this.paginationRequest.assignedToUserId = assignedToUserId === '' ? undefined : assignedToUserId;

    this.taskService.getTasks(this.paginationRequest).subscribe({
      next: (response) => {
        console.log(response);

        this.tasks = response.items;

        this.totalRecords = response.totalRecords;
      },

      error: (error) => {
        console.error(error);

        this.showMessage('Unable to load tasks.');
      },
    });
  }

  // Delete Task
  protected deleteTask(taskId: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',

      disableClose: true,

      data: {
        title: 'Delete Task',

        message: 'Are you sure you want to delete this task?',

        confirmText: 'Delete',

        cancelText: 'Cancel',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }

      this.taskService.deleteTask(taskId).subscribe({
        next: () => {
          this.showMessage('Task deleted successfully.');

          this.loadTasks();
        },

        error: (error) => {
          console.error(error);
          // comment on this because we created the error interceptor
          // this.showMessage('Unable to delete task.');
        },
      });
    });
  }

  // Page Change
  protected onPageChange(event: PageEvent): void {
    this.paginationRequest.pageIndex = event.pageIndex;

    this.paginationRequest.pageSize = event.pageSize;

    this.loadTasks();
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
