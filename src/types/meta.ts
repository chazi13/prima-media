export interface CreatedInfo {
  created_at: string;
  created_by: number;
}

export interface UpdatedInfo {
  updated_at: string;
  updated_by: string | null;
}

export interface Auditable extends CreatedInfo, UpdatedInfo {}

export interface PageMeta {
  page: number;
  per_page: number;
  total_pages: number;
  total_count: number;
}

export interface ResponseMeta<T> {
  data: T;
  message: string;
  meta: PageMeta;
  success: true;
}

export interface ErrorResponseMeta {
  data: string;
  message: string;
  success: boolean;
}

export interface FetchOption {
  page?: number;
  limit?: number;
  sort?: "asc" | "desc";
  order?: string;
  query?: string;
}
