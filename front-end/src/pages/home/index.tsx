// useProducts.ts
import { useState, useEffect } from 'react';
import { Product, Category } from '../../models/Products.models';
import { localizationService } from '../../services/localization.service';
import { useNavigate } from 'react-router-dom';
import { confirmLogout } from '../../utilities/alerts/logoutConfirm';
import { AuthStorage } from '../../hooks/useLocalStorage';

export function useProducts(
  search?: string,
  selectedCategory?: string,
  minPrice?: number | null,
  maxPrice?: number | null
) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Efecto para cargar categorías
  useEffect(() => {
    setLoading(true);
    localizationService
      .getCategories()
      .then(data => {
        if ('params' in data) {
          setError(data.message);
        } else if (Array.isArray(data)) {
          setCategories(data);
        }
      })
      .catch(() => setError('Failed to fetch categories'))
      .finally(() => setLoading(false));
  }, []);

  // Efecto para filtrar productos
  useEffect(() => {
    setLoading(true);
    const delayDebounceFn = setTimeout(() => {
      const categoryId = selectedCategory && selectedCategory !== 'all' 
        ? Number(selectedCategory) 
        : null;

      localizationService
        .locateProducts(search, categoryId, minPrice, maxPrice)
        .then(data => {
          if ('params' in data) {
            setError(data.message);
            setFilteredProducts([]);
          } else if (Array.isArray(data)) {
            setFilteredProducts(data);
            setError(null);
          }
        })
        .catch(() => {
          setError('An error occurred while searching for products.');
          setFilteredProducts([]);
        })
        .finally(() => setLoading(false));
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, selectedCategory, minPrice, maxPrice, products]);

  return { products, filteredProducts, categories, loading, error };
}

const Home: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [minPriceInput, setMinPriceInput] = useState<string>('');
  const [maxPriceInput, setMaxPriceInput] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const minPrice = minPriceInput ? Number(minPriceInput) : null;
  const maxPrice = maxPriceInput ? Number(maxPriceInput) : null;

  const { filteredProducts, categories, loading, error } = useProducts(
    search,
    selectedCategory,
    minPrice,
    maxPrice
  );

  const navigate = useNavigate();

  const handleLogout = async () => {
    const confirmed = await confirmLogout();
    if (confirmed) {
      AuthStorage.clearToken();
      setIsLoggedIn(false);
      setTimeout(() => window.location.reload(), 1000);
    }
  };

  return (
    <div className='home-page'>
      {/* Navbar */}
      <nav className='navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top'>
        <div className='container'>
          <a className='navbar-brand' href='/'>
            <div className='d-flex align-items-center'>
              <img
                src='https://d500.epimg.net/cincodias/imagenes/2015/05/08/pyme/1431098283_691735_1431098420_noticia_normal.jpg'
                alt='Logo'
                width='40'
                height='40'
                className='rounded-circle me-2 border'
              />
              <span className='fw-bold fs-5 text-primary'>PYME Shop</span>
            </div>
          </a>

          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarContent'
          >
            <span className='navbar-toggler-icon'></span>
          </button>

          <div className='collapse navbar-collapse' id='navbarContent'>
            <div className='d-flex flex-column flex-lg-row align-items-stretch align-items-lg-center w-100 gap-3 ms-lg-auto'>
              <div className='d-flex flex-column flex-lg-row gap-2 w-100'>
                <div className='flex-grow-1 position-relative'>
                  <input
                    type='search'
                    className='form-control ps-4'
                    placeholder='Buscar productos...'
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                  <i className='bi bi-search position-absolute top-50 start-0 translate-middle-y ms-2 text-muted'></i>
                </div>

                <select
                  className='form-select flex-shrink-0'
                  style={{ width: '200px' }}
                  value={selectedCategory}
                  onChange={e => setSelectedCategory(e.target.value)}
                >
                  <option value='all'>Todas las categorías</option>
                  {categories.map(cat => (
                    <option key={cat.category_id} value={cat.category_id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className='d-flex gap-2 align-items-center'>
                <input
                  type='number'
                  min={0}
                  className='form-control'
                  placeholder='Precio mínimo'
                  value={minPriceInput}
                  onChange={e => setMinPriceInput(e.target.value)}
                  style={{ width: '120px' }}
                />
                <input
                  type='number'
                  min={0}
                  className='form-control'
                  placeholder='Precio máximo'
                  value={maxPriceInput}
                  onChange={e => setMaxPriceInput(e.target.value)}
                  style={{ width: '120px' }}
                />
              </div>

              <div className='d-flex gap-2'>
                {isLoggedIn ? (
                  <>
                    <button
                      className='btn btn-outline-danger d-flex align-items-center gap-2 py-2'
                      onClick={handleLogout}
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      <i className='bi bi-box-arrow-right'></i>
                      <span className='d-none d-lg-inline'>Cerrar Sesión</span>
                    </button>

                    <button
                      className='btn btn-primary d-flex align-items-center gap-2'
                      onClick={() => navigate('/admin')}
                    >
                      <i className='bi bi-shield-lock'></i>
                      <span className='d-none d-lg-inline'>Admin</span>
                    </button>
                  </>
                ) : (
                  <button
                    className='btn btn-outline-primary d-flex align-items-center gap-2'
                    onClick={() => navigate('/login')}
                    style={{ paddingTop: '0.5rem', paddingBottom: '0.5rem', whiteSpace: 'nowrap' }}
                  >
                    <i className='bi bi-box-arrow-in-right'></i>
                    <span className='d-none d-lg-inline'>Iniciar Sesión</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className='container py-4'>
        <div className='text-center mb-5'>
          <h1 className='display-5 fw-bold mb-3'>Nuestros Productos</h1>
          <p className='lead text-muted'>Descubre lo mejor para tu negocio</p>
        </div>

        {loading && (
          <div className='text-center py-5'>
            <div className='spinner-border text-primary' role='status'>
              <span className='visually-hidden'>Cargando...</span>
            </div>
            <p className='mt-2'>Cargando productos...</p>
          </div>
        )}

        {error && !categories.length && (
          <div className='alert alert-danger text-center' role='alert'>
            <i className='bi bi-exclamation-triangle-fill me-2'></i>
            {error}
          </div>
        )}

        {!loading && filteredProducts.length === 0 && !error && (
          <div className='text-center py-5'>
            <i className='bi bi-search text-muted' style={{ fontSize: '3rem' }}></i>
            <h3 className='mt-3'>No se encontraron productos</h3>
            <p className='text-muted'>Intenta con otros términos de búsqueda</p>
          </div>
        )}

        <div className='row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4'>
          {filteredProducts.map((product: Product) => (
            <div key={product.id} className='col'>
              <div
                className='card h-100 border-0 shadow-sm transition-all product-card'
                onClick={() => navigate(`/producto/${product.id}`)}
                role='button'
              >
                <div className='position-relative overflow-hidden' style={{ height: '200px' }}>
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className='card-img-top h-100 object-fit-cover'
                  />
                  {!product.available && (
                    <div className='position-absolute top-0 start-0 bg-danger text-white px-2 py-1 small'>
                      Agotado
                    </div>
                  )}
                </div>
                <div className='card-body d-flex flex-column'>
                  <h3 className='card-title h5 mb-2'>{product.name}</h3>
                  <p className='card-text text-muted small flex-grow-1'>
                    {product.description.length > 100
                      ? `${product.description.substring(0, 100)}...`
                      : product.description}
                  </p>
                  <div className='d-flex justify-content-between align-items-center mt-3'>
                    <span className='fw-bold fs-5 text-primary'>
                      ${product.price.toLocaleString('es-CL')}
                    </span>
                    <button
                      className='btn btn-sm btn-outline-primary'
                      onClick={e => {
                        e.stopPropagation();
                        navigate(`/producto/${product.id}`);
                      }}
                    >
                      Ver más
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;