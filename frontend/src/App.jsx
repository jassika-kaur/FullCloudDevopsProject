import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AboutPage from './pages/AboutPage';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  // Load cart and user from local storage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Error parsing cart items', e);
      }
    }
    
    const savedUser = localStorage.getItem('userInfo');
    if (savedUser) {
      try {
        setUserInfo(JSON.parse(savedUser));
      } catch (e) {
        console.error('Error parsing user info', e);
      }
    }
  }, []);

  // Save cart to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const logoutHandler = () => {
    setUserInfo(null);
    localStorage.removeItem('userInfo');
  };

  const addToCart = (product, qty) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    if (existItem) {
      setCartItems(
        cartItems.map((x) =>
          x._id === existItem._id ? { ...existItem, qty: existItem.qty + qty } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty }]);
    }
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((x) => x._id !== id));
  };
  
  const updateCartQty = (id, qty) => {
    setCartItems(
        cartItems.map((x) =>
          x._id === id ? { ...x, qty: Number(qty) } : x
        )
    );
  };

  return (
    <>
      <Navbar 
        cartCount={cartItems.reduce((acc, item) => acc + item.qty, 0)} 
        userInfo={userInfo}
        logoutHandler={logoutHandler}
      />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage setUserInfo={setUserInfo} userInfo={userInfo} />} />
          <Route path="/register" element={<RegisterPage setUserInfo={setUserInfo} userInfo={userInfo} />} />
          <Route path="/product/:id" element={<ProductPage addToCart={addToCart} />} />
          <Route 
            path="/cart" 
            element={<CartPage 
              cartItems={cartItems} 
              removeFromCart={removeFromCart} 
              updateCartQty={updateCartQty}
            />} 
          />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
