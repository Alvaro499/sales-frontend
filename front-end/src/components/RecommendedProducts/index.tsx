import { useRecommendedProducts } from './hooks';
import { UseRecommendedProductsProps } from './types';
import { useNavigate } from 'react-router-dom';
import { getProductById } from '../../services/product.services';
import './styles.css'; // CSS personalizado

export const RecommendedProducts = ({
  type,
  userId,
  productId,
}: UseRecommendedProductsProps) => {
  const { items, loading, error } = useRecommendedProducts({ type, userId, productId });
  const navigate = useNavigate();

  const handleProductClick = async (product: any) => {
    const fullProduct = await getProductById(product.product_id);
    navigate(`/products/${product.product_id}`, {
      state: { product: fullProduct },
    });
  };

  if (loading) return <p className="text-muted text-center">Cargando recomendaciones...</p>;
  if (error) return <p className="text-danger text-center">Error: {error.message}</p>;
  if (items.length === 0) return <p className="text-secondary text-center">No hay recomendaciones disponibles.</p>;

  return (
    <div className="mt-5">
      <div className="row g-4">
        {items.map((product) => (
          <div key={product.product_id} className="col-12 col-sm-6 col-md-4">
            <div className="card h-100 shadow-sm recommended-card">
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text text-muted mb-3">Score: {product.score.toFixed(2)}</p>
                </div>

                <button
                  className="btn btn-primary w-100 mt-auto recommended-btn"
                  onClick={() => handleProductClick(product)}
                  disabled={!product.product_id}
                >
                  Ver producto
                </button>

                {!product.product_id && (
                  <small className="text-danger d-block mt-2 text-center">Producto no disponible</small>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
