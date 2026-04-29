const AboutPage = () => {
  return (
    <div className="container" style={{ padding: '4rem 0' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <h1 className="section-title">About Elevate</h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--color-text-light)', lineHeight: '1.8', marginBottom: '2rem' }}>
          Welcome to Elevate! We are an exclusive e-commerce platform dedicated to bringing you the highest quality products curated from around the world. Our mission is to elevate your lifestyle with premium, carefully selected items that blend functionality with exceptional design.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginTop: '4rem' }}>
          <div style={{ backgroundColor: 'var(--color-surface)', padding: '2rem', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-md)' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>Premium Quality</h3>
            <p style={{ color: 'var(--color-text-light)' }}>We partner with top brands to ensure every product meets our strict quality standards.</p>
          </div>
          <div style={{ backgroundColor: 'var(--color-surface)', padding: '2rem', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-md)' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>Fast Shipping</h3>
            <p style={{ color: 'var(--color-text-light)' }}>Enjoy rapid delivery to your doorstep, backed by our efficient logistics network.</p>
          </div>
          <div style={{ backgroundColor: 'var(--color-surface)', padding: '2rem', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-md)' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>Customer First</h3>
            <p style={{ color: 'var(--color-text-light)' }}>Our dedicated support team is available 24/7 to assist you with any questions or concerns.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
