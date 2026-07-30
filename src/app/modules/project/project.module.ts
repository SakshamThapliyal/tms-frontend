import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectFormComponent } from './components/project-form/project-form.component';
import { authChildGuard } from 'src/app/core/guards/auth.guard';
const routes: Routes = [
  {
    path: '',
    component: ProjectListComponent,
    canActivateChild: [authChildGuard],
  },

  {
    path: 'add',
    component: ProjectFormComponent,
    canActivateChild: [authChildGuard],
  },

  {
    path: 'edit/:id',
    component: ProjectFormComponent,
    canActivateChild: [authChildGuard],
  },
];

@NgModule({
  declarations: [ProjectListComponent, ProjectFormComponent],

  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
})
export class ProjectModule {}
