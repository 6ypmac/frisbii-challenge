import { ApiList } from './api-list.model';

export type InvoiceState =
  | 'created'
  | 'pending'
  | 'authorized'
  | 'dunning'
  | 'settled'
  | 'cancelled'
  | 'failed';

export interface Invoice {
  handle: string;
  state: InvoiceState;
  amount: number;
  currency: string;
  created: string;
}

export type InvoiceList = ApiList<Invoice>;
