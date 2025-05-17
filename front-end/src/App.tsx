import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPymePage from './pages/registerPyme';
import VerificationPage from './pages/verificationPyme';
import { PasswordResetPage } from './pages/PasswordResetPage';

export const App = () => {
	return (
		<Router>
			<div className='app'>
				<Routes>
					<Route path='/registro' element={<RegisterPymePage />} />
					<Route path='/verificacion' element={<VerificationPage />} />
					<Route path='/reset-password/:token' element={<PasswordResetPage />} />
				</Routes>
			</div>
		</Router>
	);
};
