export interface ApiList<T> {
  size: number;
  count: number;
  from: string;
  to: string;
  range: string;
  content: T[];
  next_page_token?: string;
}
