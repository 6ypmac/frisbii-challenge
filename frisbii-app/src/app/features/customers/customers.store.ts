import { Injectable, inject, signal } from '@angular/core';
import { CustomersService } from './customers.service';
import { Customer } from '../../models/customer.model';

@Injectable({
  providedIn: 'root',
})
export class CustomersStore {
  private readonly customersService = inject(CustomersService);

  readonly customers = signal<Customer[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  loadCustomers(): void {
    this.loading.set(true);
    this.error.set(null);

    this.customersService.getCustomers().subscribe({
      next: (customers) => {
        this.customers.set(customers);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load customers');
        this.loading.set(false);
      },
    });
  }
}
