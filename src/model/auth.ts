export interface LoginRequest {
  username?: string;
  password?: string;
}

export class LoginResponse {
  accessToken?: string;
}
