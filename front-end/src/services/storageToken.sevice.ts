const AUTH_TOKEN_KEY = 'app_auth_token';

export class AuthStorage {
  static setToken(token: string): void {
    try {
      localStorage.setItem(AUTH_TOKEN_KEY, token);
    } catch (error) {
      console.error('Error al guardar el token:', error);
    }
  }

  static getToken(): string | null {
    try {
      return localStorage.getItem(AUTH_TOKEN_KEY);
    } catch (error) {
      console.error('Error al obtener el token:', error);
      return null;
    }
  }

  static clearToken(): void {
    try {
      localStorage.removeItem(AUTH_TOKEN_KEY);
    } catch (error) {
      console.error('Error al eliminar el token:', error);
    }
  }

  static decodeToken(): Record<string, any> | null {
    try {
      const token = this.getToken();
      if (!token) return null;

      const payloadBase64 = token.split('.')[1];
      if (!payloadBase64) return null;

      // atob decodifica Base64
      const decodedPayload = JSON.parse(atob(payloadBase64));
      return decodedPayload;
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return null;
    }
  }

  static isTokenExpired(): boolean {
    const decoded = this.decodeToken();
    if (!decoded || !decoded.exp) return true;

    const now = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
    return decoded.exp < now;
  }
}
