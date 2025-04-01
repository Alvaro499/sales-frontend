export function login(email: string, password: string) {
	// usamos las variables de verdad
	console.log('Logging in with', email, password);

	return Promise.resolve({ token: 'fake-token' });
}
