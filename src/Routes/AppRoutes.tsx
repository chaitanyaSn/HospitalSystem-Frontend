
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from '../Pages/Dashboard'
import Login from '../Pages/Login'
import Resgister from '../Pages/Resgister'
import PublicRoute from './PublicRoute'
import ProtectedRoute from './ProtectedRoute'
import PatientDashboard from '../Layout/PatientDashboard'
import PatientProfile from '../Pages/Patient/PatientProfile'
import AdminDashboard from '../Layout/AdminDashboard'
import DoctorDashboard from '../Layout/DoctorDashboard'
import PatientAppointment from '../Pages/Patient/PatientAppointment'


const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login page without layout */}
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Resgister /></PublicRoute>} />

        {/* Routes with layout */}
         <Route path='/' element={<ProtectedRoute><AdminDashboard/></ProtectedRoute>}>
          <Route path="/dashboard" element={<Dashboard />} />
         </Route>

          <Route path='/patient' element={<ProtectedRoute><PatientDashboard /></ProtectedRoute>}>
          <Route path="profile" element={<PatientProfile />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="appointment" element={<PatientAppointment />} />
          </Route>

          <Route path='/doctor' element={<ProtectedRoute><DoctorDashboard /></ProtectedRoute>}>
          <Route path="profile" element={<PatientProfile />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="appointment" element={<Dashboard />} />
          <Route path="book" element={<Dashboard />} />
          </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
