import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from './components/MainLayout'
import First from './pages/First'
import Cezar from './pages/Cezar'
import './App.css'
import Home from './pages/Home'
import Vijiner from './pages/Vijiner'
import MagicSquare from './pages/MagicSquare'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path='/first' element={<First />} />
          <Route path='/cezar' element={<Cezar />} />
          <Route path='/vijiner' element={<Vijiner />} />
          <Route path='/magic-square' element={<MagicSquare />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
