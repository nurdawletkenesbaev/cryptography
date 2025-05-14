import React, { useState } from 'react'
import { cezarEncrypt } from './cezarEncrypt'

const Cezar = () => {
  const [text, setText] = useState('')
  const [shift, setShift] = useState(1)
  const [encrypted, setEncrypted] = useState('')

  const handleEncrypt = () => {
    const result = cezarEncrypt(text, Number(shift))
    setEncrypted(result)
  }

  return (
    <div className='relative flex justify-center'>
      <div>
        <div className='p-[20px] border-b-[1px] border-[#00ff00] max-w-[500px]'>
          <h1 className='text-[22px] text-[#00ff00] my-[20px] text-muted text-center'>
            Tekstti Cezar shifrlaw algoritmi járdeminde shifrlań hám deshifrlań
          </h1>
          <p className='text-center text-[#00ff00] mb-[20px] '>
            Bunda shifrlaw yamasa deshifrlawdıń hár birine bólek funkciya jazıw
            shárt bolmaydı. Tek ǵana berilgen k gilt sanına teris yamasa oń
            mánis beriw jetkilikli.
          </p>
          <form className='flex flex-col gap-[20px]'>
            <div className='text-white flex flex-col gap-[5px]'>
              <label htmlFor='encryption-input'>K sanın kiritiń</label>
              <input
                onChange={(e) => setShift(+e.target.value)}
                id='encryption-input'
                type='number'
                placeholder='K sanın kiritiń'
                className='px-[5px] py-[7px] border-gray-200 border-[1px] rounded-md outline-none focus:border-[#00ff00] duration-200'
              />
            </div>
            <div className='text-white flex flex-col gap-[5px]'>
              <label htmlFor='encryption-textarea'>Tekstti kiritiń</label>
              <input
                onChange={(e) => setText(e.target.value.trim())}
                id='encryption-textarea'
                type='text'
                placeholder='Tekstti kiritiń'
                className='px-[5px] py-[7px] border-gray-200 border-[1px] rounded-md outline-none focus:border-[#00ff00] duration-200'
              />
            </div>
          </form>
          <div className='mt-[20px] flex justify-end'>
            <button
              onClick={handleEncrypt}
              className='text-white btn btn-success bg-[#00ff00] px-[12px] py-[7px] cursor-pointer rounded-md hover:scale-105 active:scale-95 duration-200'
            >
              Shifrlaw
            </button>
          </div>
          <div className='mt-[20px] text-white '>
            <p className='text-[20px] text-[#ff0000]'>
              <span className='text-[18px] text-[#00ff00] p-[5px] rounded-sm bg-black opacity-90'>
                Shifrlanǵan tekst:
              </span>{' '}
              {encrypted}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cezar
