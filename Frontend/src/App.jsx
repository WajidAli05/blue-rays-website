import './App.css'
import { SignupForm } from "./components/SignupForm"
import { Routes, Route } from 'react-router'

function App() {

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center">
      <Routes>
        <Route path='/signup' element={<SignupForm />} />
      </Routes>
    </main>
  )
}

export default App
