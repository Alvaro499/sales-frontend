import RegisterPymePage from './pages/register/RegisterPymePage';

// src/App.tsx
const App = () => {
	// <-- Cambiado a arrow function
	return (
		<div className='app'>
			<RegisterPymePage />
		</div>
	);
};

export default App; // <-- Añade esta línea
