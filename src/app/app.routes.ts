import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '', 
    redirectTo: 'solid',  
    pathMatch: 'full',
  },
  {
    path: 'solid',
    loadComponent: () => import('./solid/solid.page').then(m => m.SolidPage),
  },
];