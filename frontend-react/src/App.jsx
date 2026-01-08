import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import TicketScreen from './pages/TicketScreen'
// import ProtectedRoute from './utils/ProtectedRoute'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            {/* <Route element={<ProtectedRoute />}>
              <Route path="ticket-screen" element={<TicketScreen />} />
            </Route> */}
            <Route path="ticket-screen" element={<TicketScreen />} />
          </Route>
      </Routes>
    </>
  )
}

export default App
