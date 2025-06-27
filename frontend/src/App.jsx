import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Doctors from './pages/doctors'
import Login from './pages/Login'
import MyAppointment from './pages/MyAppointment'
import Myprofile from './pages/myprofile'
import Contact from './pages/contact'
import About from './pages/about'
import Appointment from './pages/Appointment'
import Header from './components/Header'
import Footer from './components/Footer'
import { ToastContainer, toast } from 'react-toastify';



const App = () => {
  return (
    <div className='mx-4 sm:mx-[8%]'>
      <ToastContainer position="top-center" autoClose={2000} />
      <Header />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/doctors' element={<Doctors />}/>
        <Route path='/doctors/:speciality' element={<Doctors />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/my-appointment' element={<MyAppointment />}/>
        <Route path='/appointment/:docId' element={<Appointment />}/>
        <Route path='/my-profile' element={<Myprofile />}/>
        <Route path='/contact' element={<Contact />}/>
        <Route path='/about' element={<About />}/>
      </Routes>
      <Footer />
    </div>
  )
}

export default App