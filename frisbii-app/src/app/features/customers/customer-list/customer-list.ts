import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CustomersStore } from '../customers.store';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './customer-list.html',
  styleUrl: './customer-list.scss',
})
export class CustomerListComponent {
  readonly store = inject(CustomersStore);

  constructor() {
    this.store.loadCustomers();
  }
}
