import React, { useEffect, useRef } from 'react'
import Header from './Header'
import Content from './Content'
import { Outlet, useLocation } from 'react-router-dom'
import MatrixRain from './pageComponents/MatrixRain'

const MainLayout = () => {
  const { pathname } = useLocation()
  const wrapperRef = useRef()

  useEffect(() => {
    wrapperRef.current.scrollTop = 0
  }, [pathname])
  return (
    <div className='relative'>
      <Header />
      <div ref={wrapperRef}>
        <Content>
          <Outlet />
        </Content>
      </div>
      <MatrixRain />
    </div>
  )
}

export default MainLayout
