import Sidebar from '../Components/Sidebar/Sidebar'
import Header from '../Components/Header/Header'
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom'
import Home from '../Pages/Home'
import Dashboard from '../Pages/Dashboard'
import Login from '../Pages/Login'
import Resgister from '../Pages/Resgister'

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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Resgister />} />

        {/* Routes with layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
