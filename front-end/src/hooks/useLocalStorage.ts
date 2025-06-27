const AUTH_TOKEN_KEY = 'app_auth_token';
const AUTH_PYMEID_KEY = 'app_auth_pymeId';

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

  static setPymeId(pymeId: string): void {
    try {
      localStorage.setItem(AUTH_PYMEID_KEY, pymeId);
    } catch (error) {
      console.error('Error al guardar el pymeId:', error);
    }
  }

  static getPymeId(): string | null {
    try {
      return localStorage.getItem(AUTH_PYMEID_KEY);
    } catch (error) {
      console.error('Error al obtener el pymeId:', error);
      return null;
    }
  }


  static clearToken(): void {
    try {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem('email');
      localStorage.removeItem('id');
      localStorage.removeItem('roles');
      localStorage.removeItem('sub');
      localStorage.removeItem('exp');
      localStorage.removeItem('iat');
      localStorage.removeItem('user');

    } catch (error) {
      console.error('Error al eliminar datos del almacenamiento:', error);
    }
  }

  static decodeToken(): Record<string, any> | null {
    try {
      const token = this.getToken();
      if (!token) return null;

      const [, payloadBase64] = token.split('.');
      if (!payloadBase64) return null;

      const base64 = payloadBase64.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );

      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return null;
    }
  }

  static storeDecodedToken(): void {
    const decoded = this.decodeToken();
    if (!decoded) {
      console.warn('[AuthStorage] No se pudo decodificar el token');
      return;
    }

    try {
      localStorage.setItem('email', decoded.email ?? '');
      localStorage.setItem('userId', decoded.id?.toString() ?? '');
      localStorage.setItem('roles', Array.isArray(decoded.roles) ? decoded.roles.join(',') : decoded.roles ?? '');
      localStorage.setItem('sub', decoded.sub ?? '');
      localStorage.setItem('exp', decoded.exp?.toString() ?? '');
      localStorage.setItem('iat', decoded.iat?.toString() ?? '');

      console.log('[AuthStorage] Token decodificado y campos almacenados:', decoded);
    } catch (error) {
      console.error('Error al guardar campos del token en localStorage:', error);
    }
  }

  static isTokenExpired(): boolean {
    const decoded = this.decodeToken();
    if (!decoded || !decoded.exp) return true;

    const now = Math.floor(Date.now() / 1000);
    return decoded.exp < now;
  }
}
