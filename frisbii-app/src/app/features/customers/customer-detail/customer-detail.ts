import { Component, effect, inject, untracked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

import { CustomersStore } from '../customers.store';
import { InvoicesStore } from '../../invoices/invoices.store';
import { SubscriptionsStore } from '../../subscriptions/subscriptions.store';

@Component({
  selector: 'app-customer-detail',
  standalone: true,
  templateUrl: './customer-detail.html',
  styleUrl: './customer-detail.scss',
})
export class CustomerDetailComponent {
  private readonly route = inject(ActivatedRoute);

  readonly customers = inject(CustomersStore);
  readonly invoices = inject(InvoicesStore);
  readonly subscriptions = inject(SubscriptionsStore);

  readonly customerHandle = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('handle')!)),
    { initialValue: '' },
  );

  constructor() {
    effect(() => {
      const handle = this.customerHandle();

      if (!handle) {
        return;
      }

      untracked(() => {
        this.customers.loadCustomer(handle);
        this.invoices.loadInvoices(handle);
        this.subscriptions.loadSubscriptions(handle);
      });
    });
  }
}
