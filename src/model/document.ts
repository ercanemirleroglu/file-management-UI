export interface DocumentResponse {
  id?: number;
  name?: string;
  path?: string;
  extension?: string;
  size?: number;
  data?: any;
}

export interface DocumentListResponse {
  documentInfos?: DocumentResponse[]
}
