import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPymePage from './pages/registerPyme';
import VerificationPage from './pages/verificationPyme';
import { passwordReset } from './pages/passwordReset';
import ProductPublishForm from './pages/publishProduct';
import ProductPublishPanel from './pages/manageProducts';
import Home from './pages/home';
import AdminHome from './pages/admin';
import AuthPage from './pages/auth';
import RegisterUserPage from './pages/user';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import CartPage from './pages/cart';
import CheckoutPage from './pages/checkout';

const App = () => {
  return (
    <Router>
      <div className='app'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/registerPyme' element={<RegisterPymePage />} />
          <Route path='/verification' element={<VerificationPage />} />
          <Route path='/reset-password/:token' element={<passwordReset />} />
          <Route path='/newProduct' element={<ProductPublishForm />} />
          <Route path='/productPublishPanel' element={<ProductPublishPanel />} />
          <Route path='/admin' element={<AdminHome />} />
          <Route path='/login' element={<AuthPage />} /> 
          <Route path='/registerUser' element={<RegisterUserPage />} />
          <Route path='/cart' element={<CartPage/>} />
          <Route path='/checkout' element={<CheckoutPage/>} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;