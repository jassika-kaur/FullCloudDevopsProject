import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Star, ArrowLeft, ShoppingCart, Check, ShieldCheck, Truck } from 'lucide-react';

const ProductPage = ({ addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/products/${id}`);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) return <div className="loader-container"><div className="loader"></div></div>;
  if (error) return <div className="container" style={{padding: '3rem 0', color: 'var(--color-danger)'}}>Product not found.</div>;

  return (
    <div className="container">
      <Link to="/" className="btn btn-secondary" style={{marginBottom: '2rem', display: 'inline-flex'}}>
        <ArrowLeft size={16} /> Back to Results
      </Link>
      
      <div className="product-detail">
        <div className="product-detail-image-container">
          <img src={product.image} alt={product.name} className="product-detail-image" />
        </div>
        
        <div className="product-detail-info">
          <div className="product-detail-brand">{product.brand}</div>
          <h1 className="product-detail-title">{product.name}</h1>
          
          <div className="product-rating" style={{fontSize: '1rem'}}>
            <Star size={18} fill="currentColor" stroke="none" />
            <Star size={18} fill="currentColor" stroke="none" />
            <Star size={18} fill="currentColor" stroke="none" />
            <Star size={18} fill="currentColor" stroke="none" />
            <Star size={18} fill="currentColor" stroke="none" style={{opacity: 0.5}} />
            <span style={{color: 'var(--color-text)', fontWeight: 500, marginLeft: '0.5rem'}}>{product.rating}</span>
            <span className="product-reviews">({product.numReviews} reviews)</span>
          </div>
          
          <div className="product-detail-price">${product.price.toFixed(2)}</div>
          
          <p className="product-detail-desc">{product.description}</p>
          
          <div className="product-detail-meta">
            <div className="meta-item">
              <span style={{color: 'var(--color-text-light)'}}>Status</span>
              <span className={`stock-status ${product.countInStock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
            
            {product.countInStock > 0 && (
              <div className="meta-item" style={{alignItems: 'center', borderBottom: 'none'}}>
                <span style={{color: 'var(--color-text-light)'}}>Quantity</span>
                <div className="qty-selector" style={{marginBottom: 0}}>
                  <button className="qty-btn" onClick={() => setQty(qty > 1 ? qty - 1 : 1)}>-</button>
                  <input type="text" value={qty} readOnly className="qty-input" />
                  <button className="qty-btn" onClick={() => setQty(qty < product.countInStock ? qty + 1 : product.countInStock)}>+</button>
                </div>
              </div>
            )}
          </div>
          
          <button 
            className="btn btn-primary" 
            style={{width: '100%', padding: '1rem', fontSize: '1.1rem'}}
            disabled={product.countInStock === 0}
            onClick={handleAddToCart}
          >
            {added ? <><Check size={20} /> Added to Cart</> : <><ShoppingCart size={20} /> Add to Cart</>}
          </button>
          
          <div style={{marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--color-text-light)'}}>
              <Truck size={20} style={{color: 'var(--color-primary)'}} />
              <span>Free shipping on orders over $50</span>
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--color-text-light)'}}>
              <ShieldCheck size={20} style={{color: 'var(--color-primary)'}} />
              <span>2 year extended warranty available</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
