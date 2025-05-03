import RegisterPyme from './pages/register';
// src/App.tsx
const App = () => {
	// <-- Cambiado a arrow function
	return (
		<div className='app'>
			<RegisterPyme />
		</div>
	);
};

export default App; // <-- Añade esta línea
