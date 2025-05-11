import React, { useEffect, useState, lazy, Suspense } from 'react';
import HeroBanner from '../../components/HeroBanner';
import PopularCategories from '../../components/PopularCategories';
import TopProducts from '../../components/TopProducts';
import axios from 'axios';
import { useCart } from '../../context/CartContext';
import ImageSlider from '../../components/ImageSlider';

const SmartTravelPack = lazy(() => import('../../components/SmartTravelPack'));
const PersonalizedRecommendations = lazy(() => import('../../components/PersonalizedRecommendations'));
const ScheduledDelivery = lazy(() => import('../../components/ScheduledDelivery'));
const ProductModal = lazy(() => import('../../components/ProductModal'));

const Home = () => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setModalOpen(false);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const url = selectedCategory === 'All'
          ? 'https://tokogo-backend.onrender.com/api/products'
          : `https://tokogo-backend.onrender.com/api/products?category=${selectedCategory}`;
        const res = await axios.get(url);
        setProducts(res.data.products);
      } catch (err) {
        console.error('Failed to fetch products', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  return (
    <div className="flex flex-col gap-12 px-4 sm:px-6 lg:px-12 xl:px-20 py-8 max-w-[1600px] mx-auto relative">
      <div className="animate-fade-in">
        <HeroBanner />
      </div>

      <div className="rounded-xl overflow-hidden shadow-md animate-slide-in-up">
        <ImageSlider />
      </div>

      <div className="z-10">
        <PopularCategories
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />
      </div>

      <section id="top-products" className="relative">
        <TopProducts
          products={products}
          loading={loading}
          onProductClick={handleProductClick}
        />
      </section>

      {modalOpen && selectedProduct && (
        <Suspense fallback={<div>Loading...</div>}>
          <ProductModal
            product={selectedProduct}
            onClose={closeModal}
            addToCart={addToCart}
          />
        </Suspense>
      )}

      <Suspense fallback={<div>Loading Smart Travel Pack...</div>}>
        <SmartTravelPack />
      </Suspense>

      <Suspense fallback={<div>Loading Personalized Recommendations...</div>}>
        <PersonalizedRecommendations />
      </Suspense>

      <Suspense fallback={<div>Loading Scheduled Delivery...</div>}>
        <ScheduledDelivery />
      </Suspense>
    </div>
  );
};

export default Home;
