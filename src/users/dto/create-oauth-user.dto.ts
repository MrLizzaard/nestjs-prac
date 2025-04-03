export interface CreateOAuthUserDto {
  oauthProvider: string;
  oauthId: string;
  email: string;
  name: string;
}
