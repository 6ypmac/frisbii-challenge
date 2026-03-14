import { Component, inject } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';

import { InvoicesStore } from '../invoices.store';

@Component({
  selector: 'app-invoice-list',
  standalone: true,
  imports: [DatePipe, DecimalPipe],
  templateUrl: './invoice-list.html',
  styleUrl: './invoice-list.scss',
})
export class InvoiceListComponent {
  readonly invoices = inject(InvoicesStore);
}
