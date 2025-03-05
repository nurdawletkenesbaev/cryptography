import React, { useState } from 'react'

const FirstDecryption = ({ remove }) => {
  const [keyword, setKeyword] = useState('')
  const [text, setText] = useState('')
  const [str, setStr] = useState('')

  function encryption(k, t) {
    setStr('')
    const arrayText = t.split('')
    const arrayKeyword = k.split('')
    const array = []
    arrayKeyword.sort()
    array.push(arrayKeyword)

    for (let i = 0; i < arrayText.length; i++) {
      if (i % arrayKeyword.length === 0) {
        array.push([])
      }
      if (arrayText[i] !== ' ') {
        array[array.length - 1].push(arrayText[i])
      }
      if (i === arrayText.length - 1 && (i + 1) % arrayKeyword.length !== 0) {
        for (
          let j = i % arrayKeyword.length;
          j < arrayKeyword.length - 1;
          j++
        ) {
          array[array.length - 1].push('n')
        }
      }
    }

    const newArray = []
    arrayKeyword.forEach((item, index) => {
      newArray[index] = []
    })
    array.forEach((item, index) => {
      item.map((element, ind) => (newArray[ind][index] = element))
    })

    const result = []
    newArray.forEach((item, index) => {
      result[index] = []
    })
    newArray.forEach((item, index) => {
      result[keyword.indexOf(newArray[index][0])] = item
    })

    const last = []
    array.forEach((item, index) => {
      last[index] = []
    })
    result.forEach((item, index) => {
      item.map((element, ind) => (last[ind][index] = element))
    })

    last.map((item, index) => {
      if (index !== 0) {
        item.map((element) => {
          setStr((prev) => prev + element)
        })
      }
    })
    setStr((prev) => prev.slice(0, remove))
  }
  return (
    <div>
      <div className='p-[20px] border-b-[1px] border-[#00ff00]'>
        <h1 className='text-[26px] text-white mb-[20px] font-bold'>
          Deshifrlaw
        </h1>
        <form className='flex flex-col gap-[20px]'>
          <div className='text-white flex flex-col gap-[5px]'>
            <label htmlFor='decryption-input'>Gilt sózin kiritiń</label>
            <input
              onChange={(e) => setKeyword(e.target.value.trim())}
              id='decryption-input'
              type='text'
              placeholder='Gilt sózin kiritiń'
              className='px-[5px] py-[7px] border-gray-400 border-[1px] rounded-md outline-none focus:border-[#00ff00] duration-200'
            />
          </div>
          <div className='text-white flex flex-col gap-[5px]'>
            <label htmlFor='decryption-textarea'>
              Shtrixlanǵan tekstti kiritiń
            </label>
            <textarea
              onChange={(e) => setText(e.target.value.trim())}
              id='decryption-textarea'
              type='text'
              placeholder='Shtrixlanǵan tekstti kiritiń'
              className='px-[5px] py-[7px] border-gray-400 border-[1px] rounded-md outline-none focus:border-[#00ff00] duration-200'
            />
          </div>
        </form>
        <div className='mt-[20px] flex justify-end'>
          <button
            onClick={() => encryption(keyword, text)}
            className='text-white  px-[12px] py-[7px] cursor-pointer rounded-md active:scale-95 duration-200'
          >
            Decryption
          </button>
        </div>
        <div className='mt-[20px] text-white'>
          <p className='text-[20px] text-[#ff0000]'>
            <span className='text-[18px] text-[#00ff00] bg-black opacity-90 p-[5px] rounded-sm'>
              Haqıyqıy tekst:
            </span>{' '}
            {str}
          </p>
        </div>
      </div>
    </div>
  )
}

export default FirstDecryption
