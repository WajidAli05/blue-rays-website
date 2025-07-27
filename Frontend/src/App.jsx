import './App.css';
import { useState, useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import SignupForm from "./components/SignupForm";
import { Home } from './pages/Home';
import About from './pages/About';
import Faqs from './pages/Faqs';
import AnnouncementBar from './components/AnnouncementBar';
import NavBar from './components/NavBar';
import CategoriesNavBar from './components/CategoriesNavBar';
import Footer from './components/Footer';
import Contact from './pages/Contact';
import LoginPage from './pages/LoginPage';
import Products from './pages/Products';
import ProductsBySubCategory from './pages/ProductsBySubCategory';
import CartPage from './pages/CartPage';
import ShippingPage from './pages/ShippingPage';
import { Toaster } from 'sonner';
import ProtectedRoutes from './utils/ProtectedRoutes';
import { isMobile } from 'react-device-detect';

function App() {
  const [announcements, setAnnouncements] = useState([]);
  const [currentAnnouncement, setCurrentAnnouncement] = useState('Welcome to our website!');
  const location = useLocation();
  const hasTracked = useRef(false);

  const isSignupPage = location.pathname === '/signup';
  const isLoginPage = location.pathname === '/login';
  const hideBars = isSignupPage || isLoginPage;

  // ✅ Fetch announcements from backend
  const fetchAnnouncements = () => {
    fetch('http://localhost:3001/api/v1/active-announcement', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status && Array.isArray(data.data)) {
          setAnnouncements(data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching announcements:", error);
      });
  };

//track device type: mobile or desktop
useEffect(() => {  
  // Prevent sending multiple times in one session
  if (!hasTracked.current && !sessionStorage.getItem('deviceTracked')) {
    const deviceType = isMobile ? 'mobile' : 'desktop';
    console.log('Tracking device type:', deviceType);

    fetch('http://localhost:3001/api/v1/trackDevice', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ deviceType }),
    })
      .then((res) => {
        if (res.ok) {
          sessionStorage.setItem('deviceTracked', 'true');
          console.log('Device type tracked successfully:', deviceType);
        } else {
          console.log('Tracking failed with status:', res.status);
        }
      })
      .catch((err) => {
        console.error('Error tracking device:', err);
      });

    hasTracked.current = true;
  } else {
    console.log('Device tracking skipped (already tracked this session)');
  }
}, []);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  //  Rotate announcements every 5 seconds
  useEffect(() => {
    if (announcements.length === 0) return;

    let index = 0;
    setCurrentAnnouncement(announcements[index].message);

    const interval = setInterval(() => {
      index = (index + 1) % announcements.length;
      setCurrentAnnouncement(announcements[index].message);
    }, 5000);

    return () => clearInterval(interval);
  }, [announcements]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black flex flex-col">
      {/*  Top bars (hidden on signup/login pages) */}
      {!hideBars && (
        <>
          <AnnouncementBar text={currentAnnouncement || "Welcome to our website!"} />
          <NavBar />
          <CategoriesNavBar />
        </>
      )}

      {/*  Sonner Toaster for notifications */}
      <Toaster   richColors
                position="top-right"
                duration={3000}
                closeButton
                theme="dark" 
      />

      {/*  Main content */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/contact" element={<Contact />} />
          <Route element={<ProtectedRoutes />}>
                <Route path="/cart" element={<CartPage />} />
                <Route path="/shipping" element={<ShippingPage />} />
          </Route>
          <Route path="/products/:category" element={<Products />} />
          <Route path="/sub-category/:subcategory" element={<ProductsBySubCategory />} />
        </Routes>
      </main>

      {/*  Footer (also hidden on signup/login pages) */}
      {!hideBars && <Footer />}
    </div>
  );
}

export default App;