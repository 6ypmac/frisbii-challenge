import { Component, inject } from '@angular/core';

import { CustomersStore } from '../customers.store';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  templateUrl: './customer-list.html',
  styleUrl: './customer-list.scss',
})
export class CustomerListComponent {
  readonly store = inject(CustomersStore);

  constructor() {
    this.store.loadCustomers();
  }
}
