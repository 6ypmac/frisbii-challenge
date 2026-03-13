import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { Subscription, SubscriptionList } from '../../models/subscription.model';

const DEFAULT_SUBSCRIPTIONS_PAGE_SIZE = 20;

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService {

  private readonly http = inject(HttpClient);

  getSubscriptions(size: number = DEFAULT_SUBSCRIPTIONS_PAGE_SIZE): Observable<Subscription[]> {
    return this.http
      .get<SubscriptionList>(`${environment.apiUrl}/v1/list/subscription`, {
        params: { size }
      })
      .pipe(
        map(response => response.content)
      );
  }

}
