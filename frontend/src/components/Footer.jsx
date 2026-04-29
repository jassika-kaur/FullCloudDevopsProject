const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <h3 style={{fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: '800'}}>Elevate</h3>
            <p style={{color: '#94a3b8', marginTop: '1rem', lineHeight: '1.6'}}>
              Premium e-commerce platform offering the best products at the best prices with stunning UI.
            </p>
          </div>
          <div className="footer-col">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><a href="#">Home</a></li>
              <li><a href="#">Shop</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h3>Customer Service</h3>
            <ul className="footer-links">
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Shipping & Returns</a></li>
              <li><a href="#">Store Policy</a></li>
              <li><a href="#">Payment Methods</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h3>Newsletter</h3>
            <p style={{color: '#94a3b8', marginBottom: '1rem'}}>Subscribe to get special offers and updates.</p>
            <div style={{display: 'flex', gap: '0.5rem'}}>
              <input type="email" placeholder="Email address" style={{padding: '0.75rem', borderRadius: 'var(--radius-md)', border: 'none', width: '100%', outline: 'none'}} />
              <button className="btn btn-primary" style={{padding: '0.75rem 1rem'}}>Subscribe</button>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          &copy; {new Date().getFullYear()} Elevate E-Commerce. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
