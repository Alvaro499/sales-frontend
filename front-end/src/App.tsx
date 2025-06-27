import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPymePage from './pages/registerPyme';
import VerificationPage from './pages/verificationPyme';
import ProductPublishForm from './pages/publishProduct';
import ProductPublishPanel from './pages/manageProducts';
import PasswordReset1 from './pages/passwordReset';
import Home from './pages/home';
import AdminHome from './pages/admin';
import AuthPage from './pages/auth';
import RegisterUserPage from './pages/user';
import CartPage from './pages/cart';
import CheckoutPage from './pages/checkout';
import ProductDetailPage from './pages/productDetail';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Página principal */}
          <Route path="/" element={<Home />} />

          {/* Registro y verificación de Pyme */}
          <Route path="/registerPyme" element={<RegisterPymePage />} />
          <Route path="/verification" element={<VerificationPage />} />

          {/* Restablecimiento de contraseña */}
          <Route path="/reset-password/:token" element={<PasswordReset1 />} />

          {/* Gestión y publicación de productos */}
          <Route path="/newProduct" element={<ProductPublishForm />} />
          <Route path="/productPublishPanel" element={<ProductPublishPanel />} />

          {/* Panel administrativo */}
          <Route path="/admin" element={<AdminHome />} />

          {/* Autenticación y registro de usuarios */}
          <Route path="/login" element={<AuthPage />} />
          <Route path="/registerUser" element={<RegisterUserPage />} />

          {/* Detalle de producto */}
          <Route path="/products/:productId" element={<ProductDetailPage />} />

          {/* Carrito y checkout */}
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
