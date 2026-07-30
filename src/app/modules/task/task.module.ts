import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { authChildGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: TaskListComponent,
    canActivateChild: [authChildGuard],
  },
  {
    path: 'add',
    component: TaskFormComponent,
    canActivateChild: [authChildGuard],
  },
  {
    path: 'edit/:id',
    component: TaskFormComponent,
    canActivateChild: [authChildGuard],
  },
];

@NgModule({
  declarations: [
    TaskListComponent,
    TaskFormComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
})
export class TaskModule {}
