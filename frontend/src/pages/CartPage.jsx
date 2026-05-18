import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ArrowRight } from 'lucide-react';

const CartPage = ({ cartItems, removeFromCart, updateCartQty }) => {
  const navigate = useNavigate();

  const checkoutHandler = () => {
    // navigate('/login?redirect=shipping')
    alert("Proceeding to checkout! (This is a mock application)");
  };

  return (
    <div className="container">
      <h1 className="section-title" style={{ textAlign: 'left', marginBottom: '3rem' }}>Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem 0', backgroundColor: 'var(--color-surface)', borderRadius: 'var(--radius-xl)' }}>
          <h2 style={{ marginBottom: '1rem' }}>Your cart is empty</h2>
          <p style={{ color: 'var(--color-text-light)', marginBottom: '2rem' }}>Looks like you haven't added anything to your cart yet.</p>
          <Link to="/" className="btn btn-primary">Start Shopping</Link>
        </div>
      ) : (
        <div className="cart-page">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item._id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-img" />
                <Link to={`/product/${item._id}`} className="cart-item-title">{item.name}</Link>
                <div className="cart-item-price">${item.price.toFixed(2)}</div>

                <div className="qty-selector" style={{ marginBottom: 0 }}>
                  <select
                    style={{ padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                    value={item.qty}
                    onChange={(e) => updateCartQty(item._id, e.target.value)}
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  className="btn-icon"
                  style={{ color: 'var(--color-danger)' }}
                  onClick={() => removeFromCart(item._id)}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2 className="summary-title">Order Summary</h2>

            <div className="summary-row">
              <span>Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)})</span>
              <span>${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="summary-row">
              <span>Tax</span>
              <span>${(cartItems.reduce((acc, item) => acc + item.qty * item.price, 0) * 0.1).toFixed(2)}</span>
            </div>

            <div className="summary-total">
              <span>Total</span>
              <span>${(cartItems.reduce((acc, item) => acc + item.qty * item.price, 0) * 1.1).toFixed(2)}</span>
            </div>

            <button
              className="btn btn-primary btn-block"
              onClick={checkoutHandler}
            >
              Proceed to Checkout <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
