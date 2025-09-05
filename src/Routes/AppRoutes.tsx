import Sidebar from '../Components/Sidebar/Sidebar'
import Header from '../Components/Header/Header'
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom'
import Home from '../Pages/Home'
import Dashboard from '../Pages/Dashboard'
import Login from '../Pages/Login'
import Resgister from '../Pages/Resgister'
import PublicRoute from './PublicRoute'
import ProtectedRoute from './ProtectedRoute'
import PatientDashboard from '../Layout/PatientDashboard'

// Layout with Sidebar + Header
const Layout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <Header />
        <Outlet /> {/* This is where nested routes render */}
      </div>
    </div>
  )
}

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login page without layout */}
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Resgister /></PublicRoute>} />

        {/* Routes with layout */}
         <Route path='/' element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

          <Route path='/patient' element={<ProtectedRoute><PatientDashboard /></ProtectedRoute>}>
          <Route path="profile" element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="appointment" element={<Dashboard />} />
          <Route path="book" element={<Dashboard />} />
          
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
