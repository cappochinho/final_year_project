import AuthService from './auth.util';

export default function authHeader() {
  const accessToken = AuthService.getAccessToken();

  if (accessToken) {
    return {
      Authorization: `Bearer ${accessToken}`,
    };
  } else {
    return {};
  }
}
