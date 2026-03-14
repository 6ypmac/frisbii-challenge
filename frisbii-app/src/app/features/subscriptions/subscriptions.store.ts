import { Injectable, inject, signal } from '@angular/core';

import { Subscription, SubscriptionState } from '../../models/subscription.model';
import { SubscriptionsService } from './subscriptions.service';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionsStore {
  private readonly subscriptionsService = inject(SubscriptionsService);

  readonly subscriptions = signal<Subscription[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly actionHandle = signal<string | null>(null);

  loadSubscriptions(customerHandle: string): void {
    this.subscriptions.set([]);
    this.loading.set(true);
    this.error.set(null);

    this.subscriptionsService.getSubscriptionsByCustomer(customerHandle).subscribe({
      next: (subscriptions) => {
        this.subscriptions.set(subscriptions);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load subscriptions');
        this.loading.set(false);
      },
    });
  }

  pauseSubscription(subscriptionHandle: string): void {
    this.actionHandle.set(subscriptionHandle);
    this.error.set(null);

    this.subscriptionsService.pauseSubscription(subscriptionHandle).subscribe({
      next: () => {
        this.updateSubscriptionState(subscriptionHandle, 'on_hold');
        this.actionHandle.set(null);
      },
      error: () => {
        this.error.set('Failed to pause subscription');
        this.actionHandle.set(null);
      },
    });
  }

  unpauseSubscription(subscriptionHandle: string): void {
    this.actionHandle.set(subscriptionHandle);
    this.error.set(null);

    this.subscriptionsService.unpauseSubscription(subscriptionHandle).subscribe({
      next: () => {
        this.updateSubscriptionState(subscriptionHandle, 'active');
        this.actionHandle.set(null);
      },
      error: () => {
        this.error.set('Failed to unpause subscription');
        this.actionHandle.set(null);
      },
    });
  }

  private updateSubscriptionState(subscriptionHandle: string, nextState: SubscriptionState): void {
    this.subscriptions.update((subscriptions) =>
      subscriptions.map((subscription) =>
        subscription.handle === subscriptionHandle
          ? { ...subscription, state: nextState }
          : subscription,
      ),
    );
  }
}
