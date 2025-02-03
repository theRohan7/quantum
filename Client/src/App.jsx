import { useState } from 'react'
import './App.css'
import Auth from './Pages/Auth.jsx'
import { Toaster } from 'react-hot-toast'
import { Routes, Route } from 'react-router-dom'
import Homepage from './Pages/Homepage.jsx'

function App() {

  return (
    <>
    <Toaster />
    <Routes>
      <Route path='/auth' element={<Auth />} />
      <Route path= '/' element={<Homepage />} />
    </Routes>
    </>
  )
}

export default App
