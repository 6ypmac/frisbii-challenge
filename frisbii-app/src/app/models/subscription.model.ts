import { ApiList } from './api-list.model';

export type SubscriptionState =
  | 'active'
  | 'expired'
  | 'on_hold'
  | 'pending'
  | 'cancelled'
  | 'active_non_cancelled';

export interface Subscription {
  handle: string;
  state: SubscriptionState;
  plan: string;
  created: string;
}

export type SubscriptionList = ApiList<Subscription>;
