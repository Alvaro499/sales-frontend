import { useRecommendedProducts } from './hooks';
import { UseRecommendedProductsProps } from './types';

export const RecommendedProducts = ({
  type,
  userId,
  productId,
}: UseRecommendedProductsProps) => {
  const { items, loading, error } = useRecommendedProducts({ type, userId, productId });

  if (loading) return <p className="text-gray-500">Cargando recomendaciones...</p>;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;
  if (items.length === 0) return <p className="text-gray-400">No hay recomendaciones disponibles.</p>;

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">
        {type === 'association' ? 'Recomendado para vos' : 'Productos similares'}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((product) => (
          <div key={product.product_id} className="p-4 border rounded shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-lg">{product.name}</h3>
            <p className="text-sm text-gray-500">Score: {product.score}</p>
            <button className="mt-2 text-blue-500 hover:underline">
              Ver producto
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
