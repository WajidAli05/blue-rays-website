import './App.css'
import { Routes, Route } from 'react-router'
import { SignupForm } from "./components/SignupForm"
import { Home } from './pages/Home'
import About from './pages/About'
import Faqs from './pages/Faqs'

function App() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/about" element={<About />} />
        <Route path="/faqs" element={<Faqs />} />
      </Routes>
    </main>
  )
}

export default App
