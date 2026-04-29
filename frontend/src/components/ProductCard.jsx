import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <Link to={`/product/${product._id}`} className="product-image-container">
        {product.countInStock === 0 && (
          <span className="product-badge" style={{ backgroundColor: 'var(--color-danger)' }}>Out of Stock</span>
        )}
        {product.isNew && (
          <span className="product-badge">New</span>
        )}
        <img src={product.image} alt={product.name} className="product-image" />
      </Link>
      
      <div className="product-info">
        <div className="product-brand">{product.brand}</div>
        <Link to={`/product/${product._id}`}>
          <h3 className="product-title">{product.name}</h3>
        </Link>
        
        <div className="product-rating">
          <Star size={16} fill="currentColor" stroke="none" />
          <span>{product.rating}</span>
          <span className="product-reviews">({product.numReviews} reviews)</span>
        </div>
        
        <div className="product-bottom">
          <div className="product-price">${product.price.toFixed(2)}</div>
          <Link to={`/product/${product._id}`} className="add-to-cart-btn" aria-label="View Product">
            <ShoppingCart size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
