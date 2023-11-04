export interface APIResponse<T> {
  count: number;
  num_pages: number;
  current_page: number;
  next: string;
  previous: string;
  results: T[];
}
