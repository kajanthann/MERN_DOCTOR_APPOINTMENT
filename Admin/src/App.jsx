import React, { useContext } from 'react'
import Login from './pages/Login'
  import { ToastContainer, toast } from 'react-toastify';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import AllAppointments from './pages/Admin/AllAppointments';
import AddDoctors from './pages/Admin/AddDoctors';
import DoctorsList from './pages/Admin/DoctorsList';

const App = () => {

  const {atoken} = useContext(AdminContext)

  return atoken ? (
    <div className='bg-[#F8F9FA]'>
      <ToastContainer />
      <Navbar />
      <div className='flex items-start'>
        <Sidebar />
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/admin-dashboard' element={<Dashboard />} />
          <Route path='/all-appointments' element={<AllAppointments />} />
          <Route path='/add-doctor' element={<AddDoctors />} />
          <Route path='/doctor-list' element={<DoctorsList />} />
        </Routes>
      </div>
    </div>
  ) : (
    <div>
      <ToastContainer />
      <Login />
    </div>
    
  )
}

export default App