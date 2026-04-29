import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { ArrowRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || '';

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`http://localhost:5000/api/products?keyword=${keyword}`);
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [keyword]);

  return (
    <div className="container">
      {!keyword ? (
        <div className="hero">
          <div className="hero-content">
            <h1 className="hero-title">Discover Your Next Favorite Thing</h1>
            <p className="hero-subtitle">Curated premium products designed to elevate your everyday life. Shop our exclusive collection today.</p>
            <button className="btn btn-primary">
              Shop Now <ArrowRight size={18} />
            </button>
          </div>
          <img 
            src="https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&q=80" 
            alt="Featured Products" 
            className="hero-image"
          />
        </div>
      ) : (
        <div style={{ marginBottom: '2rem' }}>
          <h2>Search Results for: "{keyword}"</h2>
          <hr style={{ margin: '1rem 0', borderColor: 'var(--color-border)', borderStyle: 'solid' }} />
        </div>
      )}

      {!keyword && <h2 className="section-title">Trending Products</h2>}
      
      {loading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : error ? (
        <div style={{color: 'var(--color-danger)', textAlign: 'center', padding: '2rem'}}>
          Error loading products. Please make sure the backend server is running.
        </div>
      ) : products.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-light)' }}>
          No products found matching your search.
        </div>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
