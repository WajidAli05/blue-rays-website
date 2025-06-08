import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import { SignupForm } from "./components/SignupForm";
import { Home } from './pages/Home';
import About from './pages/About';
import Faqs from './pages/Faqs';
import AnnouncementBar from './components/AnnouncementBar';
import NavBar from './components/NavBar';
import CategoriesNavBar from './components/CategoriesNavBar';
import Footer from './components/Footer';
import Contact from './pages/Contact';

function App() {
  const location = useLocation();
  const isSignupPage = location.pathname === '/signup';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black flex flex-col">
      {/* Show bars only if not on the Signup page */}
      {!isSignupPage && (
        <>
          <AnnouncementBar text="Welcome to our e-commerce site!" />
          <NavBar />
          <CategoriesNavBar />
        </>
      )}

      {/* Page content */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/about" element={<About />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      {/* Show footer only if not on the Signup page */}
      {!isSignupPage && <Footer />}
    </div>
  );
}

export default App;