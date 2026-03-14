import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { Customer, CustomerList } from '../../models/customer.model';

const DEFAULT_CUSTOMERS_PAGE_SIZE = 20;

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  private readonly http = inject(HttpClient);

  getCustomers(size: number = DEFAULT_CUSTOMERS_PAGE_SIZE): Observable<Customer[]> {
    return this.http
      .get<CustomerList>(`${environment.apiUrl}/list/customer`, {
        params: { size },
      })
      .pipe(map((response) => response.content));
  }

  getCustomer(customerHandle: string): Observable<Customer> {
    return this.http.get<Customer>(`${environment.apiUrl}/customer/${customerHandle}`);
  }
}
