import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, User, LogOut } from 'lucide-react';

const Navbar = ({ cartCount, userInfo, logoutHandler }) => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/?keyword=${keyword}`);
    } else {
      navigate('/');
    }
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <div style={{ width: '30px', height: '30px', backgroundColor: 'var(--color-primary)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
            E
          </div>
          Elevate
        </Link>
        
        <form onSubmit={submitHandler} style={{ display: 'flex', alignItems: 'center', backgroundColor: 'var(--color-background)', borderRadius: 'var(--radius-full)', padding: '0.25rem 1rem', flex: 1, maxWidth: '400px', margin: '0 2rem' }}>
          <input 
            type="text" 
            name="q" 
            onChange={(e) => setKeyword(e.target.value)} 
            placeholder="Search products..." 
            style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', padding: '0.5rem', fontFamily: 'inherit' }}
          />
          <button type="submit" style={{ color: 'var(--color-text-light)' }}>
            <Search size={18} />
          </button>
        </form>

        <div className="navbar-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About</Link>
        </div>
        
        <div className="navbar-actions">
          {userInfo ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontWeight: '500', color: 'var(--color-primary)' }}>Hi, {userInfo.name.split(' ')[0]}</span>
              <button onClick={logoutHandler} className="btn-icon" title="Logout">
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn-icon" title="Sign In">
              <User size={20} />
            </Link>
          )}
          
          <Link to="/cart" className="btn-icon cart-icon-wrapper">
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
