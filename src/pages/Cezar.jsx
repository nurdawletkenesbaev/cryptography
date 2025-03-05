import React, { useState } from 'react'
import bg from '../images/cezar.webp'

const Cezar = () => {
  const [number, setNumber] = useState(null)
  const [text, setText] = useState('')
  const [str, setStr] = useState('')
  function encryption(k, text) {
    const result = text
      .split('')
      .map((char) => {
        if (char.match(/[a-z]/i)) {
          const code = char.charCodeAt(0)
          const base = code >= 65 && code <= 90 ? 65 : 97
          return String.fromCharCode(((code - base + k + 26) % 26) + base)
        }
        return char
      })
      .join('')
    console.log(result)
    setStr(result)
  }

  return (
    <div className='relative flex justify-center'>
      <div>
        <img
          src={bg}
          alt=''
          className='absolute top-0 bottom-0 right-0 left-0 -z-10 blur-[7px] bg-black '
        />
        <div className='p-[20px] border-b-[1px] border-gray-400 max-w-[500px]'>
          <h1 className='text-[22px] text-[#00ff00] mb-[20px] text-muted text-center'>
            Tekstti Cezar shifrlaw algoritmi járdeminde shifrlań hám deshifrlań
          </h1>
          <form className='flex flex-col gap-[20px]'>
            <div className='text-white flex flex-col gap-[5px]'>
              <label htmlFor='encryption-input'>K sanın kiritiń</label>
              <input
                onChange={(e) => setNumber(+e.target.value)}
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
              onClick={() => encryption(number, text)}
              className='text-white btn btn-success bg-[#00ff00] px-[12px] py-[7px] cursor-pointer rounded-md hover:scale-105 active:scale-95 duration-200'
            >
              Encryption
            </button>
          </div>
          <div className='mt-[20px] text-white '>
            <p className='text-[20px] text-[#ff0000]'>
              <span className='text-[18px] text-[#00ff00]'>
                Shtrixlanǵan tekst:
              </span>{' '}
              {str}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cezar
