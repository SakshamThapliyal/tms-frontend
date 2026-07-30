import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';

import { PageEvent } from '@angular/material/paginator';

import { UserManagement } from '../../models/user-management';
import { UserManagementRequest } from '../../models/user-management-request';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  // Reactive Filter Form
  filterForm!: FormGroup;

  // User Data
  users: UserManagement[] = [];

  // Table Columns
  displayedColumns: string[] = ['fullName', 'email', 'phone', 'createdAt'];

  // Pagination
  totalRecords = 0;

  pageSize = 5;

  pageIndex = 0;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadUsers();
    // // Reload users whenever search changes
    // this.filterForm.valueChanges.subscribe(() => {
    //   this.pageIndex = 0;

    //   this.loadUsers();
    // });
  }

  // Initialize Reactive Form
  initializeForm(): void {
    this.filterForm = this.fb.group({
      search: [''],
    });
  }

  // Load Users
  loadUsers(): void {
    const request: UserManagementRequest = {
      search: this.filterForm.get('search')?.value ?? '',

      pageIndex: this.pageIndex,

      pageSize: this.pageSize,
    };

    this.userService.getUsersForManagement(request).subscribe({
      next: (response) => {
        this.users = response.items;

        this.totalRecords = response.totalRecords;

        this.pageIndex = response.pageIndex;

        this.pageSize = response.pageSize;
      },

      error: (error) => {
        console.error(error);
      },
    });
  }

  // Search Users
  onSearch(): void {
    this.pageIndex = 0;

    this.loadUsers();
  }

  // Pagination Event
  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;

    this.pageSize = event.pageSize;

    this.loadUsers();
  }
}
