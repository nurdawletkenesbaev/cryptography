import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../images/logo.jpg'

const Header = () => {
  return (
    <div className='h-[60px] border-b-[1px] border-[#00ff00] flex items-center justify-between px-[5%] font-semibold '>
      <Link to={'/'}>
        <img src={logo} alt='' className='w-[120px] h-[40px] object-contain' />
      </Link>
      <div className='flex justify-center items-center gap-[30px] font-light'>
        <Link to={'/'} className='text-[#00ff00] font-semibold text-[20px]'>
          Home
        </Link>
        {/* <Link className='text-[#00ff00] font-semibold text-[20px]'>
          Cryptography
        </Link> */}
      </div>
      <div></div>
    </div>
  )
}

export default Header
