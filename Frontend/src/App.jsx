import './App.css'
import { Routes, Route } from 'react-router'
import { SignupForm } from "./components/SignupForm"
import { Home } from './pages/Home'

function App() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center">
      <Routes>
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </main>
  )
}

export default App
