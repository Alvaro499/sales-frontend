export function login(email: string, password: string) {
	console.log('Logging in with', email, password);

	return Promise.resolve({ token: 'fake-token' });
}
