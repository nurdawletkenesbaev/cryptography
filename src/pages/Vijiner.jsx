import React, { useState } from 'react'

const Vijiner = () => {
  const [key, setKey] = useState('')
  const [text, setText] = useState('')
  const [str, setStr] = useState('')
  function encryption(key, text, encryption) {
    text = text.split(' ').join('')
    const arr = text.split('').map((item, index) => {
      return key[index % key.length]
    })

    const result = text
      .split('')
      .map((char, index) => {
        if (char.match(/[a-z]/i)) {
          const code = char.charCodeAt(0)
          const base = code >= 65 && code <= 90 ? 65 : 97
          if (arr[index].charCodeAt(0) > 96)
            return String.fromCharCode(
              ((code - base + encryption * (arr[index].charCodeAt(0) - 97) + 26) % 26) + base
            )
          return String.fromCharCode(
            ((code - base + encryption * (arr[index].charCodeAt(0) - 65) + 26) % 26) + base
          )
        }
        return char
      })
      .join('')
    console.log(result)
    setStr(result)
    console.log(key, text, arr)
  }

  return (
    <div className='relative flex justify-center'>
      <div>
        <div className='p-[20px] border-b-[1px] border-[#00ff00] max-w-[500px]'>
          <h1 className='text-[22px] text-[#00ff00] mb-[20px] text-muted text-center'>
            Tekstti Vijiner shifrlaw algoritmi járdeminde shifrlań hám
            deshifrlań
          </h1>
          <form className='flex flex-col gap-[20px]'>
            <div className='text-white flex flex-col gap-[5px]'>
              <label htmlFor='encryption-input'>Gilt sózin kiritiń</label>
              <input
                onChange={(e) => setKey(e.target.value.trim())}
                id='encryption-input'
                type='text'
                placeholder='Gilt sózin kiritiń'
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
          <div className='mt-[20px] w-full flex justify-between'>
            <button
              onClick={() => encryption(key, text, 1)}
              className='text-white btn btn-success bg-[#00ff00] px-[12px] py-[7px] cursor-pointer rounded-md hover:scale-105 active:scale-95 duration-200'
            >
              Encryption
            </button>
            <button
              onClick={() => encryption(key, text, -1)}
              className='text-white btn btn-success bg-[#00ff00] px-[12px] py-[7px] cursor-pointer rounded-md hover:scale-105 active:scale-95 duration-200'
            >
              Decryption
            </button>
          </div>
          <div className='mt-[20px] text-white '>
            <p className='text-[20px] text-[#ff0000]'>
              <span className='text-[18px] text-[#00ff00] p-[5px] rounded-sm bg-black opacity-90'>
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

export default Vijiner
