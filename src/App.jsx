import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Navbar from './components/Navbar'
import TripsPage from './pages/TripsPage'
import TripManagementPage from './pages/TripManagementPage'
import './App.css'

function HomePage() {
  return (
    <>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Trip Management System
        </h1>
        <p className="text-xl text-gray-600">
          Comprehensive travel planning and management solution
        </p>
      </div>

      <div className="bg-white shadow rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Quick Navigation
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link to="/trips" className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
            Trips
          </Link>
          <Link to="/bookings" className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
            Bookings
          </Link>
          <Link to="/itineraries" className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
            Itineraries
          </Link>
          <Link to="/hotels" className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
            Hotels
          </Link>
        </div>
      </div>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/trips" element={<TripsPage />} />
              <Route path="/management" element={<TripManagementPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
