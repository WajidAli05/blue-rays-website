import './App.css';
import { useState, useEffect } from 'react';
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

function App() {
  const [announcements, setAnnouncements] = useState([]);
  const [currentAnnouncement, setCurrentAnnouncement] = useState('Welcome to our website!');
  const location = useLocation();
  const isSignupPage = location.pathname === '/signup';
  const isLoginPage = location.pathname === '/login';

  const hideBars = isSignupPage || isLoginPage;

  //fetch announcements
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

  useEffect(()=> {
    fetchAnnouncements();
  }, []);


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
      {!hideBars && (
        <>
          <AnnouncementBar text= {currentAnnouncement || "Welcome to our website!"} />
          <NavBar />
          <CategoriesNavBar />
        </>
      )}

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path="/products/:category" element={<Products />} />
          <Route path='/sub-category/:subcategory' element={<ProductsBySubCategory />} />
        </Routes>
      </main>

      {!hideBars && <Footer />}
    </div>
  );
}

export default App;