import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/task', pathMatch: 'full' },
  {
    path: 'task',
    loadComponent: () =>
      import('@app/components/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  {
    path: '**',
    redirectTo: '/task',
  },
];
