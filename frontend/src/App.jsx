import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Landing from "./pages/Landing"
import Dashboard from "./pages/Dashboard"
import Demo from "./pages/Demo"

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/demo" element={<Demo />} />
      </Routes>
    </div>
  )
}