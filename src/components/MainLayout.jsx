import React from 'react'
import Header from './Header'
import Content from './Content'
import { Outlet } from 'react-router-dom'
import MatrixRain from './pageComponents/MatrixRain'

const MainLayout = () => {
  return (
    <div className='relative'>
      <Header />
      <Content>
        <Outlet />
      </Content>
      <MatrixRain />
    </div>
  )
}

export default MainLayout
