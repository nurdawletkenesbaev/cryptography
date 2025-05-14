import React, { useState } from 'react'
import FirstDecryption from '../components/firts/FirstDecryption'

const First = () => {
  const [keyword, setKeyword] = useState('')
  const [text, setText] = useState('')
  const [str, setStr] = useState('')
  const [remove, setRemove] = useState(0)

  // const parseText = (input) => {
  //   const specials = ['sh', 'ch']
  //   const result = []
  //   let i = 0

  //   while (i < input.length) {
  //     const twoChar = input.slice(i, i + 2)
  //     if (specials.includes(twoChar.toLowerCase())) {
  //       result.push(twoChar)
  //       i += 2
  //     } else {
  //       result.push(input[i])
  //       i += 1
  //     }
  //   }
  //   return result
  // }

  function encryption(k, t) {
    setStr('')
    const arrayTextL = t.split('')
    const arrayKeyword = k.split('')
    const array = []
    array.push(arrayKeyword)
    const arrayText = arrayTextL.filter((item) => item !== ' ')

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
          setRemove((prev) => prev + 1)
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

    console.log(newArray)

    newArray.sort()
    // console.log(newArray.sort())
    const result = []
    array.forEach((item, index) => {
      result[index] = []
    })
    newArray.forEach((item, index) => {
      item.map((element, ind) => (result[ind][index] = element))
    })
    result.map((item, index) => {
      if (index !== 0) {
        item.map((element) => {
          setStr((prev) => prev + element)
        })
      }
    })
  }
  return (
    <div className='flex flex-col items-center'>
      <div className='p-[20px] max-w-[500px] border-b-[1px] border-[#00ff00]'>
        <h1 className='text-[22px] text-[rgb(0,255,0)] mb-[20px] text-muted text-center'>
          Tekstti keste almastırıw usılı járdeminde shifrlań hám deshifrlań
        </h1>
        <h1 className='text-[26px] text-white mb-[20px] font-bold'>Shifrlaw</h1>
        <form className='flex flex-col gap-[20px]'>
          <div className='text-white flex flex-col gap-[5px]'>
            <label htmlFor='encryption-input'>Gilt sózin kiritiń</label>
            <input
              onChange={(e) => setKeyword(e.target.value.trim())}
              id='encryption-input'
              type='text'
              placeholder='Gilt sózin kiritiń'
              className='px-[5px] py-[7px] border-gray-400 border-[1px] rounded-md outline-none focus:border-[#00ff00] duration-200'
            />
          </div>
          <div className='text-white flex flex-col gap-[5px]'>
            <label htmlFor='encryption-textarea'>Tekstti kiritiń</label>
            <textarea
              onChange={(e) => setText(e.target.value.trim())}
              id='encryption-textarea'
              type='text'
              placeholder='Tekstti kiritiń'
              className='px-[5px] py-[7px] border-gray-400 border-[1px] rounded-md outline-none focus:border-[#00ff00] duration-200'
            />
          </div>
        </form>
        <div className='mt-[20px] flex justify-end'>
          <button
            onClick={() => encryption(keyword, text)}
            className='text-white px-[12px] py-[7px] cursor-pointer rounded-md  active:scale-95 duration-200'
          >
            Encryption
          </button>
        </div>
        <div className='mt-[20px] text-white'>
          <p className='text-[20px] text-[#ff0000]'>
            <span className='text-[18px] text-[#00ff00] bg-black opacity-90 p-[5px] rounded-sm'>
              Shtrixlanǵan tekst:
            </span>{' '}
            {str}
          </p>
        </div>
      </div>
      <div className='max-w-[500px] w-full'>
        <FirstDecryption remove={remove} />
      </div>
    </div>
  )
}

export default First
