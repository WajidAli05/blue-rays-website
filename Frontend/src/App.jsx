import './App.css';
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

function App() {
  const location = useLocation();
  const isSignupPage = location.pathname === '/signup';
  const isLoginPage = location.pathname === '/login';

  const hideBars = isSignupPage || isLoginPage;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black flex flex-col">
      {!hideBars && (
        <>
          <AnnouncementBar text="Welcome to our e-commerce site!" />
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
        </Routes>
      </main>

      {!hideBars && <Footer />}
    </div>
  );
}

export default App;