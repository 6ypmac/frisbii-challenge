import { Component, inject, effect } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

import { InvoicesStore } from '../../invoices/invoices.store';

@Component({
  selector: 'app-customer-detail',
  standalone: true,
  templateUrl: './customer-detail.html',
  styleUrl: './customer-detail.scss',
})
export class CustomerDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly invoicesStore = inject(InvoicesStore);

  readonly store = this.invoicesStore;

  readonly customerHandle = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('handle')!)),
    { initialValue: '' },
  );

  constructor() {
    effect(() => {
      const handle = this.customerHandle();

      if (handle) {
        this.invoicesStore.loadInvoices(handle);
      }
    });
  }
}
