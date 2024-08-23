import React from 'react'
import Login from './pages/Login'
import Signup from './pages/Signup';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Contextstate from './context/Contextstate';
export default function App() {
  return (
    <>
      <Contextstate>

        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </Contextstate>

    </>
  )
}
