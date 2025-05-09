import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPymePage from './pages/registerPyme'; // Asegúrate que el nombre del componente sea correcto
import VerificationPage from './pages/verificationPyme';
const App = () => {
	return (
		<Router>
			<div className='app'>
				<Routes>
					<Route path='/registro' element={<RegisterPymePage />} />
					<Route path='/verificacion' element={<VerificationPage />} />
				</Routes>
			</div>
		</Router>
	);
};

export default App;
