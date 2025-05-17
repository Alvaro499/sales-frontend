import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPymePage from './pages/registerPyme'; // Asegúrate que el nombre del componente sea correcto
import VerificationPage from './pages/verificationPyme';
import { PasswordResetPage } from './pages/PasswordResetPage';
import ProductPublishForm from './pages/publishProduct';
import ProductPublishPanel from './pages/manageProducts';

const App = () => {
	return (
		<Router>
			<div className='app'>
				<Routes>
					<Route path='/registro' element={<RegisterPymePage />} />
					<Route path='/verificacion' element={<VerificationPage />} />
					<Route path='/reset-password/:token' element={<PasswordResetPage />} />
					<Route path='/newProduct' element={<ProductPublishForm />} />

					<Route path='/productPublishPanel' element={<ProductPublishPanel />} />
				</Routes>
			</div>
		</Router>
	);
};

export default App