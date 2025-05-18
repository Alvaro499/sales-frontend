import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPymePage from './pages/registerPyme'; // Asegúrate que el nombre del componente sea correcto
import VerificationPage from './pages/verificationPyme';
import { PasswordResetPage } from './pages/PasswordResetPage';
import ProductPublishForm from './pages/publishProduct';
import ProductPublishPanel from './pages/manageProducts';
import Home from './pages/home';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminHome from './pages/admin';

const App = () => {
	return (
		<Router>
			<div className='app'>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/registro' element={<RegisterPymePage />} />
					<Route path='/verificacion' element={<VerificationPage />} />
					<Route path='/reset-password/:token' element={<PasswordResetPage />} />
					<Route path='/newProduct' element={<ProductPublishForm />} />

					<Route path='/productPublishPanel' element={<ProductPublishPanel />} />
					<Route path='/admin' element={<AdminHome />} />
					
				</Routes>
			</div>
		</Router>
	);
};

export default App