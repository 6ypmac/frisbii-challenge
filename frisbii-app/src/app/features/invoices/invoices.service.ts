import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { Invoice, InvoiceList } from '../../models/invoice.model';

const DEFAULT_INVOICES_PAGE_SIZE = 20;

@Injectable({
  providedIn: 'root',
})
export class InvoicesService {
  private readonly http = inject(HttpClient);

  getInvoicesByCustomer(
    customerHandle: string,
    size: number = DEFAULT_INVOICES_PAGE_SIZE,
  ): Observable<Invoice[]> {
    return this.http
      .get<InvoiceList>(`${environment.apiUrl}/list/invoice`, {
        params: {
          customer: customerHandle,
          size,
        },
      })
      .pipe(map((response) => response.content));
  }
}
