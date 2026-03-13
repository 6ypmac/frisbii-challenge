import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { Invoice, InvoiceList } from '../../models/invoice.model';

const DEFAULT_INVOICES_PAGE_SIZE = 20;

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {

  private readonly http = inject(HttpClient);

  getInvoices(size: number = DEFAULT_INVOICES_PAGE_SIZE): Observable<Invoice[]> {
    return this.http
      .get<InvoiceList>(`${environment.apiUrl}/v1/list/invoice`, {
        params: { size }
      })
      .pipe(
        map(response => response.content)
      );
  }

}
