import { ApiList } from './api-list.model';

export interface Customer {
  handle: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  company?: string;
  created: string;
}

export type CustomerList = ApiList<Customer>;
