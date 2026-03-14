import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { Subscription, SubscriptionList } from '../../models/subscription.model';

const DEFAULT_SUBSCRIPTIONS_PAGE_SIZE = 20;

@Injectable({
  providedIn: 'root',
})
export class SubscriptionsService {
  private readonly http = inject(HttpClient);

  getSubscriptionsByCustomer(
    customerHandle: string,
    size: number = DEFAULT_SUBSCRIPTIONS_PAGE_SIZE,
  ): Observable<Subscription[]> {
    return this.http
      .get<SubscriptionList>(`${environment.apiUrl}/list/subscription`, {
        params: {
          customer: customerHandle,
          size,
        },
      })
      .pipe(map((response) => response.content));
  }

  pauseSubscription(subscriptionHandle: string): Observable<void> {
    return this.http
      .post<unknown>(`${environment.apiUrl}/subscription/${subscriptionHandle}/on_hold`, {})
      .pipe(map(() => undefined));
  }

  unpauseSubscription(subscriptionHandle: string): Observable<void> {
    return this.http
      .post<unknown>(`${environment.apiUrl}/subscription/${subscriptionHandle}/reactivate`, {})
      .pipe(map(() => undefined));
  }
}
