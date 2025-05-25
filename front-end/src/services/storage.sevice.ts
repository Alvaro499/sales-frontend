const AUTH_TOKEN_KEY = 'app_auth_token';

export const authStorage = {
  setToken: (token: string): void => {
    try {
      // Puedes añadir encriptación básica aquí si es necesario
      localStorage.setItem(AUTH_TOKEN_KEY, token);
    } catch (error) {
      console.error('Error al guardar el token:', error);
    }
  },

  getToken: (): string | null => {
    try {
      return localStorage.getItem(AUTH_TOKEN_KEY);
    } catch (error) {
      console.error('Error al obtener el token:', error);
      return null;
    }
  },

  clearToken: (): void => {
    try {
      localStorage.removeItem(AUTH_TOKEN_KEY);
    } catch (error) {
      console.error('Error al eliminar el token:', error);
    }
  },
};