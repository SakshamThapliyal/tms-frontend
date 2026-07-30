import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

import { Project } from 'src/app/modules/project/models/project';
import { ProjectService } from 'src/app/modules/project/services/project.service';

import { User } from 'src/app/modules/user/models/user';
import { UserService } from 'src/app/modules/user/services/user.service';

import { CreateTask } from '../../models/create-task';
import { UpdateTask } from '../../models/update-task';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit {
  // Reactive Form
  protected taskForm!: FormGroup;

  // Dropdown Data
  protected projects: Project[] = [];

  protected users: User[] = [];

  // Edit Mode
  protected isEditMode = false;

  protected taskId = 0;

  // Status Dropdown
  protected statuses = ['ToDo', 'InProgress', 'Completed'];

  // Priority Dropdown
  protected priorities = ['Low', 'Medium', 'High'];

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private projectService: ProjectService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.loadProjects();

    this.loadUsers();

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');

      if (id) {
        this.isEditMode = true;

        this.taskId = +id;

        this.loadTask();
      }
    });
  }

  // Create Reactive Form
  private createForm(): void {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],

      description: [''],

      status: ['ToDo', Validators.required],

      priority: ['Medium', Validators.required],

      dueDate: [null],

      projectId: [null, Validators.required],

      assignedToUserId: [null],
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

  // Load Task (Edit)
  private loadTask(): void {
    this.taskService.getTask(this.taskId).subscribe({
      next: (task) => {
        this.taskForm.patchValue(task);
      },

      error: (error) => {
        console.error(error);

        this.showMessage('Unable to load task.');
      },
    });
  }

  // Submit Form
  protected submit(): void {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();

      return;
    }

    if (this.isEditMode) {
      this.updateTask();
    } else {
      this.createTask();
    }
  }

  // Create Task
  private createTask(): void {
    const request: CreateTask = this.taskForm.value;

    this.taskService.createTask(request).subscribe({
      next: () => {
        this.showMessage('Task created successfully.');

        this.router.navigate(['/tasks']);
      },

      error: (error) => {
        console.error(error);

        this.showMessage('Unable to create task.');
      },
    });
  }

  // Update Task
  private updateTask(): void {
    const request: UpdateTask = {
      taskId: this.taskId,
      ...this.taskForm.value,
    };

    this.taskService.updateTask(this.taskId, request).subscribe({
      next: () => {
        this.showMessage('Task updated successfully.');

        this.router.navigate(['/tasks']);
      },

      error: (error) => {
        console.error(error);

        this.showMessage('Unable to update task.');
      },
    });
  }

  // Cancel
  protected cancel(): void {
    this.router.navigate(['/tasks']);
  }

  // Snackbar
  private showMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
