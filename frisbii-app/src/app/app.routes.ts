import { Routes } from '@angular/router';

import { CustomerListComponent } from './features/customers/customer-list/customer-list';
import { CustomerDetailComponent } from './features/customers/customer-detail/customer-detail';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'customers',
    pathMatch: 'full',
  },
  {
    path: 'customers',
    component: CustomerListComponent,
  },
  {
    path: 'customers/:handle',
    component: CustomerDetailComponent,
  },
  {
    path: '**',
    redirectTo: 'customers',
  },
];
