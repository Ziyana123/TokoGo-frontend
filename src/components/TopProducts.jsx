import React from 'react';
import ProductCard from './ProductCard';

const TopProducts = ({ products, loading, onProductClick }) => {
  if (loading) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-600 text-lg animate-pulse">Loading products...</p>
      </div>
    );
  }

  return (
    <section className="mb-12">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Top Products</h2>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 auto-rows-fr">
          {products.map((product) => (
            <div key={product._id} className="h-full">
              <ProductCard product={product}  key={product._id}  onClick={onProductClick} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-lg">No products found.</p>
      )}
    </section>
  );
};

export default TopProducts;
