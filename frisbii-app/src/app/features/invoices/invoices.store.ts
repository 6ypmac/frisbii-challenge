import { Injectable, signal, inject } from '@angular/core';
import { InvoicesService } from './invoices.service';
import { Invoice } from '../../models/invoice.model';

@Injectable({
  providedIn: 'root',
})
export class InvoicesStore {
  private readonly invoicesService = inject(InvoicesService);

  readonly invoices = signal<Invoice[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  loadInvoices(customerHandle: string): void {
    this.invoices.set([]);
    this.loading.set(true);
    this.error.set(null);

    this.invoicesService.getInvoicesByCustomer(customerHandle).subscribe({
      next: (invoices) => {
        this.invoices.set(invoices);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load invoices');
        this.loading.set(false);
      },
    });
  }
}
