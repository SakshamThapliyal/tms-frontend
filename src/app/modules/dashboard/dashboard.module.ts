import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { authChildGuard } from 'src/app/core/guards/auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivateChild: [authChildGuard],
  },
];

@NgModule({
  declarations: [DashboardComponent],

  imports:
  [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
})
export class DashboardModule {}
