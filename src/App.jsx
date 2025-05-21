import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from './components/MainLayout'
import First from './pages/First'
import './App.css'
import Home from './pages/home/Home'
import Vijiner from './pages/vijiner/Vijiner'
import MagicSquare from './pages/magicSquare/MagicSquare'
import Cezar from './pages/cezar/Cezar'
import CezarAffin from './pages/cezarAffin/CezarAffin'
import OnetimePad from './pages/oneTimePad/OnetimePad'
import Rabin from './pages/rabin/Rabin'
import Rsa from './pages/rsa/Rsa'

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
          <Route path='/one-time-pad' element={<OnetimePad />} />
          <Route path='/cezar-affin' element={<CezarAffin />} />
          <Route path='/rabin' element={<Rabin />} />
          <Route path='/rsa' element={<Rsa />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
