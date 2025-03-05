import React from 'react'
import MatrixRain from '../components/pageComponents/MatrixRain'
import { ReactTyped } from 'react-typed'
import picture from '../images/headerpic.png'
import AllMethod from './AllMethod'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
      <div className='flex flex-col md:flex-row justify-between gap-[30px] px-[5%] min-h-[calc(100vh)]'>
        <div className='w-full md:w-[50%] flex flex-col justify-center items-center mb-[30px] md:mb-0'>
          <span className='text-[#00ff00] text-[44px] mb-[20px] font-semibold'>
            <ReactTyped
              strings={['Kriptografiya...']}
              typeSpeed={150}
              backSpeed={150}
              loop
            />
          </span>
          <p className='text-white text-center italic'>
            Kriptografiya - maǵlıwmatlardı jasırın saqlaw, shifrlaw hám shifrdı
            ashıw usılların úyrenetuǵın pán. Ol tiykarınan informaciyanı
            shifrlaw arqalı qorǵawǵa qaratılǵan bolıp, maǵlıwmat tek ruxsat
            berilgen shaxslar tárepinen oqılıwı yamasa túsiniliwi múmkin bolǵan
            formada kodlanadı.
          </p>
        </div>
        <div className='w-full md:w-[50%] flex flex-col justify-center items-center'>
          <img src={picture} alt='' />
        </div>
      </div>
      <AllMethod />
      <Footer />
    </div>
  )
}

export default Home
