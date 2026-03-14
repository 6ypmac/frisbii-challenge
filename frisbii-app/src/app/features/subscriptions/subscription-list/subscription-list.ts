import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';

import { SubscriptionsStore } from '../subscriptions.store';

@Component({
  selector: 'app-subscription-list',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './subscription-list.html',
  styleUrl: './subscription-list.scss',
})
export class SubscriptionListComponent {
  readonly subscriptions = inject(SubscriptionsStore);
}
