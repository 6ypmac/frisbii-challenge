import { Injectable, computed, inject, signal } from '@angular/core';

import { Customer } from '../../models/customer.model';
import { CustomersService } from './customers.service';

@Injectable({
  providedIn: 'root',
})
export class CustomersStore {
  private readonly customersService = inject(CustomersService);

  readonly customers = signal<Customer[]>([]);
  readonly customer = signal<Customer | null>(null);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  readonly fullName = computed(() => {
    const customer = this.customer();

    if (!customer) {
      return '';
    }

    const firstName = customer.first_name ?? '';
    const lastName = customer.last_name ?? '';

    return `${firstName} ${lastName}`.trim();
  });

  loadCustomers(): void {
    this.loading.set(true);
    this.error.set(null);

    this.customersService.getCustomers().subscribe({
      next: (customers) => {
        this.customers.set(customers);
        this.loading.set(false);
      },
      error: (error: unknown) => {
        this.error.set('Failed to load customers');
        this.loading.set(false);
      },
    });
  }

  loadCustomer(handle: string): void {
    if (this.customer()?.handle === handle) {
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    this.customersService.getCustomer(handle).subscribe({
      next: (customer) => {
        this.customer.set(customer);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load customer');
        this.loading.set(false);
      },
    });
  }
}
